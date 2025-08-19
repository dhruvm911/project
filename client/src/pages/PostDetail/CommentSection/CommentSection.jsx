// src/components/CommentSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CommentSection.css';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/userContext';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    // if(!token) {
    //   navigate('/login')
    // }
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${postId}`);
        setComments(response?.data);
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
        const response = await axios.post(`http://localhost:5000/api/comments`, {
          postId,
          text: newComment,
        }, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
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
