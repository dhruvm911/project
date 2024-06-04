import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar1.jpg'
import styles from './styles.module.css'

const PostAuthor = () => {
  return (
    <Link to={'/posts/users/dhruv'} className={styles.post_author}>
        <div className={styles.post_author_avatar}>
            <img src={Avatar} alt="" />
        </div>
        <div className={styles.post_author_details}>
            <h5>By: xyz</h5>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor
