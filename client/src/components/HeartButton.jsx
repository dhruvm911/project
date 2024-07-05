import React, { useState } from 'react';
import styles from './styles.module.css'; // Import your CSS module or use inline styles
import axios from 'axios';

const HeartButton = ({ postId, initialLikes }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    const handleLike = async () => {
        try {
            const response = await axios.post(`/api/posts/${postId}/like`, { like: !liked });
            console.log('Response from server:', response.data);
            setLiked(!liked);
            setLikes(response.data.likes);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div>
            <svg
                onClick={handleLike}
                className={`${styles.heart} ${liked ? styles.clicked : ''}`}
                viewBox="0 0 32 29.6"
            >
                <path d="M28.8,3.1c-3.4-3-8.9-3.1-12.3,0L16,4.3l-0.5-1.2C14,0.6,8.6,0.5,5.3,3.1c-3.6,3.2-3.8,8.4-0.3,11.7L16,28.4l11-13.6C32.7,11.4,32.4,6.3,28.8,3.1z"/>
            </svg>
            <span>{likes}</span>
        </div>
    );
};

export default HeartButton;
