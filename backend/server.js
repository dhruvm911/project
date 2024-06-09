require("dotenv").config();
const upload = require('express-fileupload');
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable set cookie
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

connection();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(upload());
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT||8080;
app.listen(port,() => console.log(`Listening on port ${port}...`));