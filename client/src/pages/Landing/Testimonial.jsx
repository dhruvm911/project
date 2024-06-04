import React from "react";
import styles from './styles.module.css';
import ProfilePic from "../../assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className={styles.work_section_wrapper}>
      <div className={styles.work_section_top}>
        <p className={styles.primary_subheading}>Testimonial</p>
        <h1 className={styles.primary_heading}>What They Are Saying</h1>
        <p className={styles.primary_text}>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>
      <div className={styles.testimonial_section_bottom}>
        <img src={ProfilePic} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <div className={styles.testimonials_stars_container}>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;