import React from "react";
import styles from './styles.module.css';
import AboutBackground from "../../assets/about-background.png";
import AboutBackgroundImage from "../../assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className={styles.about_section_container}>
      <div className={styles.about_background_image_container}>
        <img src={AboutBackground} alt="" />
      </div>
      <div className={styles.about_section_image_container}>
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className={styles.about_section_text_container}>
        <p className={styles.primary_subheading}>About</p>
        <h1 className={styles.primary_heading}>
          Blogging Is An Important Part Of A Modern Lifestyle
        </h1>
        <p className={styles.primary_text}>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <p className={styles.primary_text}>
          Non tincidunt magna non et elit. Dolor turpis molestie dui magnis
          facilisis at fringilla quam.
        </p>
        <div className={styles.about_buttons_container}>
          <button className={styles.secondary_button}>Learn More</button>
          <button className={styles.watch_video_button}>
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;