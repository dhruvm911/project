import React, { useState } from 'react'
import { DUMMY_POSTS } from '../../data'
import { Link } from 'react-router-dom'
import styles from '../../components/styles.module.css'

const Dashboard = () => {
    const [posts,setPosts] = useState(DUMMY_POSTS)
    return (
        <section className={styles.dashboard}>
            {
                posts.length? <div className={`${styles.container} ${styles.dashboard_container}`}>
                    {
                        posts.map(post => {
                            return <article key={post.id} className={styles.dashboard_post}>
                                <div className={styles.dashboard_post_info}>
                                    <div className={styles.dashboard_post_thumbnail}>
                                        <img src={post.thumbnail} alt="" /> 
                                    </div>
                                    <h5>{post.title}</h5>
                                </div>
                                <div className={styles.dashboard_post_actions}>
                                    <Link to={`/posts/${post.id}`} className={`${styles.btn} ${styles.sm}`}>View</Link>
                                    <Link to={`/posts/${post.id}/edit`} className={`${styles.btn} ${styles.sm} ${styles.primary}`}>Edit</Link>
                                    <Link to={`/posts/${post.id}/delete`} className={`${styles.btn} ${styles.sm} ${styles.danger}`}>Delete</Link>
                                </div>

                            </article>
                        })
                    }
                </div> : <h2 className={styles.center} >You have no posts yet.</h2>
            }
        </section>
  
    )
}

export default Dashboard
