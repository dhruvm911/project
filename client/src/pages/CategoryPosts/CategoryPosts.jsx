import React, { useState, useEffect } from 'react'
import PostItem from '../../components/PostItem'
import styles from '../../components/styles.module.css'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryPosts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    const {category} = useParams()
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
                setPosts(response?.data)
            } catch (error) {
                console.log(error)
            }

            setIsLoading(false)
        }

        fetchPosts();
    }, [category])

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

export default CategoryPosts
