import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../components/styles.module.css'

const ErrorPage = () => {
    return (
        <section className={styles.error_page}>
            <div className={styles.center}>
                <Link to="/" className={`${styles.btn} ${styles.primary}`}>Go Back Home</Link>
                <h2>Page Not Found</h2>
            </div>
        </section>
    )
}

export default ErrorPage
