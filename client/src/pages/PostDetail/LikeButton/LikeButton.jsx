import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import styles from './LikeButton.module.css';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

const baseUrl = process.env.REACT_APP_BASE_URL;

const LikeButton = ({ postId, initialLikes = [], userId }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLikes.includes(userId));
    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    useEffect(() => {
        setLiked(initialLikes.includes(userId));
    }, [initialLikes, userId]);

    const likePost = async (postId, userId) => {
        try {
            const response = await axios.put(`${baseUrl}/posts/${postId}/like/${userId}`, { postId, userId }, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
            return response.data; // Return response data
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    };

    const unlikePost = async (postId, userId) => {
        try {
            const response = await axios.put(`${baseUrl}/posts/${postId}/unlike/${userId}`, { postId, userId },{withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
            return response.data; // Return response data
        } catch (error) {
            console.error('Error unliking post:', error);
            throw error;
        }
    };

    const handleLike = async () => {
        try {
            const data = await likePost(postId, userId);
            setLikes(data.likes);
            setLiked(true);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    const handleUnlike = async () => {
        try {
            const data = await unlikePost(postId, userId);
            setLikes(data.likes);
            setLiked(false);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={styles.likeButton}>
            <button onClick={liked ? handleUnlike : handleLike}>
                <FontAwesomeIcon icon={liked ? faThumbsDown : faThumbsUp} />
            </button>
            <span>{likes.length}</span>
        </div>
    );
};

export default LikeButton;
