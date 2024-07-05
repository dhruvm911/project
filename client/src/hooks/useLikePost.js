import { useState } from 'react';
import axios from 'axios';

export const useLikePost = () => {
    const handleLikePost = async (postId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`);
            return response.data; // Assuming response contains updated likes count
        } catch (error) {
            throw error; // Propagate the error to handle in the component
        }
    };

    return { handleLikePost };
};