import React from 'react';
import styles from './styles.module.css';
import Navbar from './Navbar';
import BannerBackground from "../../assets/home-banner-background.png";
import BannerImage from "../../assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className={styles.home_container}>
      {/* <Navbar /> */}
      <div className={styles.home_banner_container}>
        <div className={styles.home_bannerImage_container}>
          <img src={BannerBackground} alt="" />
        </div>
        <div className={styles.home_text_section}>
          <h1 className={styles.primary_heading}>
            Your Favourite Blogging Website
          </h1>
          <p className={styles.primary_text}>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
          </p>
          <button className={styles.secondary_button}>
            Start Blogging <FiArrowRight />{" "}
          </button>
        </div>
        <div className={styles.home_image_section}>
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
