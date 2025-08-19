import React from "react";
import styles from './styles.module.css';
import Logo from "../../assets/Logo.svg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_section_one}>
        <div className={styles.footer_logo_container}>
          <img src={Logo} alt="" />
        </div>
        <div className={styles.footer_icons}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className={styles.footer_section_two}>
        <div className={styles.footer_section_columns}>
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className={styles.footer_section_columns}>
          <span>244-5333-7783</span>
          <span>hello@blog.com</span>
          <span>press@blog.com</span>
          <span>contact@blog.com</span>
        </div>
        <div className={styles.footer_section_columns}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;