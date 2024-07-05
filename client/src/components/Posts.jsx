import React, {useEffect, useState} from 'react'
import PostItem from './PostItem'
import styles from './styles.module.css'
import axios from 'axios'
import Loader from './Loader'
import { useLikePost } from '../hooks/useLikePost.js'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const { handleLikePost } = useLikePost();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.log(error)
            }

            setIsLoading(false)
        }

        fetchPosts();
    }, [])

    const handleLike = async (postID) => {
        try {
            const response = await handleLikePost(postID);
            setPosts((prevPosts) =>
                prevPosts.map(post =>
                    post._id === postID ? { ...post, likes: response.likes } : post
                )
            );
        } catch(error) {
            console.error('Error liking post: ', error);
        }
        
    };

    if(isLoading) {
        return <Loader/>
    }

    return (
        <section className={styles.posts}>
            {posts.length > 0 ? (
                <div className={`${styles.posts_container} ${styles.container}`}>
                    {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt, likes }) => (
                        <PostItem
                            key={id}
                            postID={id}
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            description={description}
                            authorID={creator}
                            createdAt={createdAt}
                            initialLikes={likes.length}
                            onLike={handleLike}
                        />
                    ))}
                </div>
            ) : (
                <h2 className={styles.center}>No posts found</h2>
            )}
        </section>
    );

};

export default Posts
