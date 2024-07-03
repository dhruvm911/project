// controllers/commentController.js
const Comment = require('../models/commentModel');
const HttpError = require('../models/errorModel');

const createComment = async (req, res, next) => {
  const { postId, text } = req.body;
  const userId = req.user._id;

  if (!postId || !text) {
    return next(new HttpError("Post ID and comment text are required.", 422));
  }

  try {
    const comment = new Comment({
      postId,
      text,
      author: userId
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    return next(new HttpError("Creating comment failed, please try again.", 500));
  }
};

const getCommentsByPostId = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate('author', 'name');
    res.status(200).json(comments);
  } catch (error) {
    return next(new HttpError("Fetching comments failed, please try again later.", 500));
  }
};

module.exports = {
  createComment,
  getCommentsByPostId
};
