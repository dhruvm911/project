// services/postService.js

import axios from 'axios';


// const API_URL = 'http://localhost:5000/api/posts';


export const likePost = async (postId, token) => {
  
  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`,{},{withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};
