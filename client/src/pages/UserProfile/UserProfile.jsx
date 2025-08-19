import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';
import styles from '../../components/styles.module.css'
import { UserContext } from '../../context/userContext';
import axios from 'axios';

const UserProfile = () => {
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams();
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')

    const [isAvatarTouched, setIsAvatarTouched] = useState(false)

    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    //redirect to login page for any user who isn't logged in
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    }, [token, navigate])

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
                const {name, email, avatar} = response.data;
                setName(name);
                setEmail(email);
                setAvatar(avatar);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        getUser();
    }, [id, token])

    const changeAvatarHandler = async () => {
        setIsAvatarTouched(false);
        try {
            const postData = new FormData();
            postData.append('avatar',avatar);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            setAvatar(response?.data.avatar)
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserDetail = async (e) => {
        e.preventDefault();

        try {
            const userData = new FormData();
            userData.set('name',name);
            userData.set('email',email);
            userData.set('currentPassword',currentPassword);
            userData.set('newPassword',newPassword);
            userData.set('confirmNewPassword',confirmNewPassword);

            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
            if(response.status === 200) {
                //log user out
                navigate('/logout')
            }
        } catch (error) {
            // setError(error.response.data.message);
            setError(error.response?.data?.message || 'An error occurred while updating user details.');
            console.log(error);
            
        }
    }


    return (
        <section className={styles.profile}>
            <div className={`${styles.container} ${styles.profile_container}`}>
            <Link to={`/myposts/${currentUser.id}`} className={styles.btn}>My posts</Link>
                <div className={styles.profile_details}>
                    <div className={styles.avatar_wrapper}>
                        <div className={styles.profile_avatar}>
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
                        </div>
                        
                        {/* Form to update avatar */}
                        <form className={styles.avatar_form}>
                            <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])}
                            accept="png, jpg, jpeg" />
                            <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}><FaEdit/></label>


                        </form>

                        {isAvatarTouched && <button className={styles.profile_avatar_btn} onClick={changeAvatarHandler}><FaCheck/></button>}
                    </div>
                    <h1>{currentUser.name}</h1>

                    <form className={`${styles.form} ${styles.profile_form}`} onSubmit={updateUserDetail}>
                        {error && <p className={styles.form_error_message}>{error}</p>}
                        <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail (e.target.value)} />
                        <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword
                        (e.target.value)} />
                        <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                        <button type="submit" className={`${styles.btn} ${styles.primary}`} >Update details</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default UserProfile
