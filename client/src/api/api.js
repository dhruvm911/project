import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const likePost = async (postId, userId) => {
    try {
        return await axios.put(`${baseUrl}/posts/like`, { postId, userId });
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
};

export const unlikePost = async (postId, userId) => {
    try {
        return await axios.put(`${baseUrl}/posts/unlike`, { postId, userId });
    } catch (error) {
        console.error('Error unliking post:', error);
        throw error;
    }
};