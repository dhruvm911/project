import styles from './styles.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
    const [data,setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/api/users/register";
            const {data:res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message);
        } catch (error) {
            if(error.response &&
                error.response.status>=400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.form_area}>
                <p className={styles.title}>SIGN UP</p>
                <form action="POST" onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label className={styles.sub_title} for="name">Name</label>
                        <input name='name' value={data.name} required onChange={handleChange} placeholder="Enter your full name" className={styles.form_style} type="text"/>
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.sub_title} for="email">Email</label>
                        <input name='email' value={data.email} required onChange={handleChange} placeholder="Enter your email" id="email" className={styles.form_style} type="email"/>
                    </div>
                    <div className={styles.form_group}>
                        <label className={styles.sub_title} for="password">Password</label>
                        <input name='password' value={data.password} required onChange={handleChange} placeholder="Enter your password" id="password" className={styles.form_style} type="password"/>
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <div>
                        <button className={styles.btn}>SIGN UP</button>
                        <p>Have an Account? <Link className={styles.link} to="/login">Login Here!</Link></p><a className={styles.link} href="">
                    </a></div><a className={styles.link} href="">
                
            </a></form></div><a className={styles.link} href="">
        </a></div>
    )
};

export default Signup;