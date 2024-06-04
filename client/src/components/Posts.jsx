import React, {useState} from 'react'
import PostItem from './PostItem'
import { DUMMY_POSTS } from '../data'
import styles from './styles.module.css'

const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS)
    return (
        <section className={styles.posts}>
            {posts.length>0 ? <div className={`${styles.posts_container} ${styles.container} `}>
                {
                    posts.map(({id,thumbnail,category,title,desc,authorID}) => 
                    <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
                    desc={desc} authorID={authorID} />)
                }
            </div> : <h2 className={styles.center}>No posts found</h2>}
            
        </section>
        
        
    )
}

export default Posts
