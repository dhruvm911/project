import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import styles from './styles.module.css'
import { useLikePost } from '../hooks/useLikePost';
import HeartButton from './HeartButton';


const PostItem = ({ postID, category, title, description, authorID, thumbnail, createdAt, initialLikes, onLike }) => {
    const [likes, setLikes] = useState(initialLikes);
    const { handleLikePost } = useLikePost();

    if (!description) {
        console.error("PostItem received undefined description", { postID, title, description });
    }

    let shortDescription = '';
    if (description && typeof description === 'string') {
        shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    } else {
        console.error("Desc is undefined");
    }
    let postTitle = '';
    if (title && typeof title === 'string') {
        postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
    } else {
        console.error("Title is undefined");
    }

    const handleLike = async () => {
        try {
            const response = await handleLikePost(postID);
            setLikes(response.likes);
            if (onLike) {
                onLike(postID, response.likes);
            }
            console.log('Post liked successfully:', response.data);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };
    

    return (
        <article className={styles.post}>
            <div className={styles.post_thumbnail}>
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
            </div>
            <div className={styles.post_content}>
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                </Link>
                <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
                <div className={styles.post_footer}>
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className={`${styles.btn} ${styles.category}`}>{category}</Link>
                    <HeartButton postId={postID} initialLikes={initialLikes} onLike={() => onLike(postID)} />
                </div>
            </div>
        </article>
    );
}

export default PostItem
