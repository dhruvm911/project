require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const upload = require('express-fileupload');
const connection = require("./db");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect to the database
connection();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Change to false if not needed
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Database connection error:', error);
});
