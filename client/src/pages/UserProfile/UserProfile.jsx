import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/avatar15.jpg'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';
import styles from '../../components/styles.module.css'

const UserProfile = () => {
    const [avatar, setAvatar] = useState(Avatar)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    return (
        <section className={styles.profile}>
            <div className={`${styles.container} ${styles.profile_container}`}>
            <Link to={`/myposts/dhruv`} className={styles.btn}>My posts</Link>
                <div className={styles.profile_details}>
                    <div className={styles.avatar_wrapper}>
                        <div className={styles.profile_avatar}>
                            <img src={avatar} alt="" />
                        </div>
                        {/* Form to update avatar */}
                        <form className={styles.avatar_form}>
                            <input type="file" name="avatar" id="avatar" onChange={e => setAvatar (e.target.files[0])}
                            accept="png, jpg, jpeg" />
                            <label htmlFor="avatar"><FaEdit/></label>


                        </form>
                        <button className={styles.profile_avatar_btn}><FaCheck/></button>
                    </div>
                    <h1>User</h1>

                    <form className={`${styles.form} ${styles.profile_form}`}>
                        <p className={styles.form_error_message}>This is an error message</p>
                        <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder='Email' value={email} onChange={e => setEmail (e.target.value)} />
                        <input type="password" placeholder='Current password' value={currentPassword} onChange={e =>
                        setCurrentPassword(e.target.value)} />
                        <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword
                        (e.target.value)} />
                        <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e =>
                        setConfirmNewPassword (e.target.value)} />
                        <button type="submit" className={`${styles.btn} ${styles.primary}`} >Update details</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default UserProfile
