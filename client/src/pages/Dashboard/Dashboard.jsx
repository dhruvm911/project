import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../../components/styles.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import Loader from '../../components/Loader'
import axios from 'axios'
import DeletePost from '../DeletePost/DeletePost'

const Dashboard = () => {
    const [posts,setPosts] = useState([])
    const [isLoading,setIsLoading] = useState(false);
    const {id} = useParams()

    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    //redirect to login page for any user who isn't logged in
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        }
        fetchPosts();
    }, [id])

    if(isLoading) {
        return <Loader/>
    }

    return (
        <section className={styles.dashboard}>
            {
                posts.length? <div className={`${styles.container} ${styles.dashboard_container}`}>
                    {
                        posts.map(post => {
                            return <article key={post.id} className={styles.dashboard_post}>
                                <div className={styles.dashboard_post_info}>
                                    <div className={styles.dashboard_post_thumbnail}>
                                        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" /> 
                                    </div>
                                    <h5>{post.title}</h5>
                                </div>
                                <div className={styles.dashboard_post_actions}>
                                    <Link to={`/posts/${post._id}`} className={`${styles.btn} ${styles.sm}`}>View</Link>
                                    <Link to={`/posts/${post._id}/edit`} className={`${styles.btn} ${styles.sm} ${styles.primary}`}>Edit</Link>
                                    <DeletePost postID={post._id} />
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
