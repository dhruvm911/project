import React, { useRef } from 'react';
import Home from "../Landing/Home";
import About from "../Landing/About";
import Work from "../Landing/Work";
import Testimonial from "../Landing/Testimonial";
import Contact from "../Landing/Contact";
import Footer from "../Landing/Footer";
import Navbar from '../Landing/Navbar'; // Import the Navbar component

function Layout() {
    const home = useRef(null);
    const about = useRef(null);
    const work = useRef(null);
    const testimonial = useRef(null);
    const contact = useRef(null);

const scrollHandler = (elmRef) => {
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" });
};

return (
    <div>
        <Navbar 
            scrollHandler={scrollHandler} 
            refs={{ home, about, work, testimonial, contact }} 
        />
        <div ref={home}><Home /></div>
        <div ref={about}><About /></div>
        <div ref={work}><Work /></div>
        <div ref={testimonial}><Testimonial /></div>
        <div ref={contact}><Contact /></div>
        <Footer />
    </div>
);
}

export default Layout;
