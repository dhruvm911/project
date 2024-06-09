const HttpError = require("../models/errorModel")
const { User, validate } = require("../models/userModel")
const bcrypt = require("bcrypt");
const Joi = require("joi");
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')


//=================REGISTER A NEW USER
//POST: api/users/register
//UNPROTECTED
const registerUser = async (req,res,next) => {
    try {
        // Validate the request body
        const { error } = validate(req.body);
        if (error) {
            return next(new HttpError(error.details[0].message, 400));
        }

        // Check if a user with the given email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return next(new HttpError("User with given email already exists", 409));
        }

        // Generate salt and hash the password
        const saltRounds = Number(process.env.SALT);
        if (!saltRounds) {
            return next(new HttpError("Internal Server Error: SALT environment variable not set properly", 500));
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user and save to the database
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        // Send a success response
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return next(new HttpError("Internal Server Error", 500));
    }
}

//=================LOGIN A NEW USER
//POST: api/users/login
//UNPROTECTED
const loginUser = async (req,res,next) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const {email, password} = req.body;
        if(!email || !password) {
            return next(new HttpError("Fill in all the fields",422))
        } 

        const newEmail = email.toLowerCase();

        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const {_id:id,name} = user;

        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in successfully" ,id,name});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

//=================USER PROFILE
//POST: api/users/:id
//PROTECTED
const getUser = async (req,res,next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user) {
            return next(new HttpError("User not found.",404))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//=================CHANGE USER AVATAR
//POST: api/users/change-avatar
//PROTECTED
const changeAvatar = async (req,res,next) => {
    try {
        if(!req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422))
        }
        // find user from database
        
        const user = await User.findById(req.user._id)
        if (!user) {
            return next(new HttpError("User not found.", 404));
        }
        // delete old avatar if exists
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })
        }
        const {avatar} = req.files;
        // check file size
        if(avatar.size > 500000) {
            return next(new HttpError("Profile picture too big. Should be less than 500kb"),422)
        }

        let fileName;
        fileName = avatar.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length-1]
        avatar.mv(path.join(__dirname,'..','uploads',newFilename), async (err) => {
            if(err) {
                return next(new HttpError(error))
            }

            const updatedAvatar = await User.findByIdAndUpdate(req.user._id,{avatar: newFilename},{new:true})
            if(!updatedAvatar) {
                return next(new HttpError("Avatar could not be changed.", 422))
            }
            res.status(200).json(updatedAvatar)
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}

//=================Edit User Details(from profile)
//POST: api/users/edit-user
//PROTECTED
const editUser = async (req,res,next) => {
    try {
        const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body;
        if (!name || !email || ! currentPassword || !newPassword) {
            return next(new HttpError("Fill in all fields.", 422))
        }
        // get user from database
        const user = await User.findById(req.user._id);
        if(!user) {
            return next(new HttpError("User not found.", 403))
        }
        
        //make sure new email does not already exists
        const emailExist = await User.findOne({email});
        //we want to update other details with/without changing the email (which is a unique id because we use it to login)
        if(emailExist && (emailExist._id != req.user.id)) {
            return next(new HttpError("Email already exist.",422))
        }
        //compare current password to database password
        const validateUserPassword = await bcrypt.compare(currentPassword,user.password);
        if(!validateUserPassword) {
            return next(new HttpError("Invalid current password",422))
        }

        //compare new passwords
        if(newPassword !== confirmNewPassword) {
            return next(new HttpError("New password do not match.",422))
        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword,salt);

        //update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user._id,{name,email,password: hash},{new:true})
        res.status(200).json(newInfo)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//=================GET AUTHORS
//POST: api/users/authors
//UNPROTECTED
const getAuthors = async (req,res,next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors}
