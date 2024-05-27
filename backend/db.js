const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");

module.exports = () => {
    // const connectionParams = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // };
    try {
        mongoose.connect(process.env.DB,{});
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database");
        
    }
};