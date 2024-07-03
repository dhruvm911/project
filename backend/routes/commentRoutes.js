// routes/commentRoutes.js
const express = require('express');
const { createComment, getCommentsByPostId } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new comment
router.post('/', authMiddleware, createComment);


// Route to get comments by postId
router.get('/:postId', getCommentsByPostId);

module.exports = router;
