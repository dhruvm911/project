import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PostAuthor from '../../components/PostAuthor';
import Loader from '../../components/Loader';
import DeletePost from '../DeletePost/DeletePost';
import { UserContext } from '../../context/userContext';
import CommentSection from '../PostDetail/CommentSection/CommentSection';
import LikeButton from './LikeButton/LikeButton';
import styles from '../../components/styles.module.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section className={styles.post_detail}>
      {post && (
        <div className={`${styles.container} ${styles.post_detail_container}`}>
          <div className={styles.post_detail_header}>
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className={styles.post_detail_buttons}>
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className={`${styles.btn} ${styles.sm} ${styles.primary}`}
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className={styles.post_detail_thumbnail}>
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt={post.title}
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          <LikeButton postId={post._id} initialLikes={post.likes} userId={currentUser?.id} />
          <CommentSection postId={id} />
        </div>
      )}
    </section>
  );
};

export default PostDetail;