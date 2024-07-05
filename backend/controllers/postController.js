// postController.js

const Post = require('../models/postModel');
const { User, validateUser } = require('../models/userModel');
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const HttpError = require('../models/errorModel');

//=============CREATE A POST
//POST: api/posts
//PROTECTED
const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422));
        }
        const { thumbnail } = req.files;
        // Check the file size
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb."));
        }

        const fileName = thumbnail.name;
        const splittedFilename = fileName.split('.');
        const newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err.message));
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user._id });
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created.", 422));
                }
                // Find user and increment post count by 1
                const currentUser = await User.findById(req.user._id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user._id, { posts: userPostCount });

                res.status(201).json(newPost);
            }
        });
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============GET ALL POSTS
//GET: api/posts
//UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============GET SINGLE POST
//GET: api/posts/:id
//UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found", 404));
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============GET POSTS BY CATEGORY
//GET: api/posts/categories/:category
//UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============GET USER/AUTHOR POSTS
//GET: api/posts/users/:id
//PROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============EDIT POST
//PATCH: api/posts/:id
//PROTECTED
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const oldPost = await Post.findById(postId);
        if (req.user._id.toString() === oldPost.creator.toString()) {
            let updatedPost;
            if (!req.files) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
            } else {
                // Delete old thumbnail from upload
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                    if (err) {
                        return next(new HttpError(err.message));
                    }
                });
                // Upload new thumbnail
                const { thumbnail } = req.files;
                if (thumbnail.size > 2000000) {
                    return next(new HttpError("Thumbnail too big. Should be less than 2mb"));
                }
                const fileName = thumbnail.name;
                const splittedFilename = fileName.split('.');
                const newFileName = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

                thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
                    if (err) {
                        return next(new HttpError(err.message));
                    }
                });

                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFileName }, { new: true });
            }
            if (!updatedPost) {
                return next(new HttpError("Couldn't update post.", 400));
            }

            res.status(200).json(updatedPost);
        } else {
            return next(new HttpError("Unauthorized action.", 403));
        }
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============DELETE A POST
//DELETE: api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable.", 400));
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        if (req.user._id.toString() === post.creator.toString()) {
            // Delete thumbnail from uploads folder
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err.message));
                } else {
                    await Post.findByIdAndDelete(postId);
                    // Find user and reduce post count by 1
                    const currentUser = await User.findById(req.user._id);
                    const userPostCount = currentUser?.posts - 1;
                    await User.findByIdAndUpdate(req.user._id, { posts: userPostCount });

                    res.json(`Post ${postId} deleted successfully.`);
                }
            });
        } else {
            return next(new HttpError("Unauthorized action.", 403));
        }
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

//=============LIKE A POST
//PUT: api/posts/:id/like
//PROTECTED
const likePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userLikeIndex = post.likes.findIndex(like => like.user.toString() === req.user._id.toString());

        if (userLikeIndex !== -1) {
            // User already liked the post, so remove the like
            post.likes.splice(userLikeIndex, 1);
        } else {
            // User has not liked the post yet, so add the like
            post.likes.push({ user: req.user._id });
        }

        await post.save();

        res.status(200).json({ likes: post.likes.length });
    } catch (error) {
        next(error); // Handle error appropriately
    }
};

module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost, likePost };
