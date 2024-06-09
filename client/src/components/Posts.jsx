import React, {useEffect, useState} from 'react'
import PostItem from './PostItem'
import styles from './styles.module.css'
import axios from 'axios'
import Loader from './Loader'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
                setPosts(response?.data)
            } catch (error) {
                console.log(error)
            }

            setIsLoading(false)
        }

        fetchPosts();
    }, [])

    if(isLoading) {
        return <Loader/>
    }

    return (
        <section className={styles.posts}>
            {posts.length>0 ? <div className={`${styles.posts_container} ${styles.container} `}>
                {
                    posts.map(({_id:id,thumbnail,category,title,desc,creator, createdAt}) => 
                    <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
                    desc={desc} authorID={creator} createdAt={createdAt} />)
                }
            </div> : <h2 className={styles.center}>No posts found</h2>}
            
        </section>
        
        
    )
}

export default Posts
