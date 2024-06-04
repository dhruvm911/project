import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import styles from './styles.module.css'

const PostItem = ({postID, category, title, desc, authorID, thumbnail}) => {
    let shortDescription = '';
    if(desc && typeof desc === 'string') {
        shortDescription = desc.length > 145 ? desc.substr(0, 145) + '...' : desc;
    } else {
        console.error("Desc is undefined");
    }
    let postTitle = '';
    if(title && typeof title === 'string') {
        postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
    } else {
        console.error("Desc is undefined");
    }

  return (
    <article className={styles.post}>
        <div className={styles.post_thumbnail}>
            <img src={thumbnail} alt={title} />
        </div>
        <div className={styles.post_content}>
            <Link to={`/posts/${postID}`} >
                <h3>{postTitle}</h3>
            </Link>
            <p>{shortDescription}</p>
            <div className={styles.post_footer}>
                <PostAuthor />
                <Link to={`/posts/categories/${category}`} className={`${styles.btn} ${styles.category}`}>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem
