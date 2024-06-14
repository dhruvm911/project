import React from "react";
import styles from './styles.module.css';

const Contact = () => {
  return (
    <div className={styles.contact_page_wrapper}>
      <h1 className={styles.primary_heading}>Have Question In Mind?</h1>
      <h1 className={styles.primary_heading}>Let Us Help You</h1>
      <div className={styles.contact_form_container}>
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className={styles.secondary_button}>Submit</button>
      </div>
    </div>
  );
};

export default Contact;