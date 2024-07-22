// src/components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments?postId=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, {
          postId,
          text: newComment,
        });
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Please leave a Comment</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
