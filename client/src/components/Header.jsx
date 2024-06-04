import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import {FaBars} from "react-icons/fa"
import { AiOutlineClose } from 'react-icons/ai'
import styles from './styles.module.css'

const Header = () => {
    const [isNavShowing,setIsNavShowing] = useState(window.innerWidth>100? true: false);
    const closeNavHandler = () => {
        if(window.innerWidth < 800) {
            setIsNavShowing(false);
        } else {
            setIsNavShowing(true);
        }
    }
  return (
    
    <nav>
        <div className={`${styles.container} ${styles.nav_container}`}>
            <Link to="/" className={styles.nav_logo} onClick={closeNavHandler}>
                <img src={Logo} alt='Navbar Logo' />
            </Link>
            {isNavShowing && <ul className={styles.nav_menu}>
                <li><Link to="/profile/dhruv" onClick={closeNavHandler}>Profile</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
                <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
                <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
            </ul>}
            <button className={styles.nav_toggle_btn} onClick={() => setIsNavShowing(!isNavShowing)}>
                
                {isNavShowing? <AiOutlineClose/>: <FaBars/>}
            </button>
        </div>
    </nav>
  )
}

export default Header
