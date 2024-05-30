import {Route, Routes, Navigate} from 'react-router-dom';

import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Landing/Home";
import About from "./components/Landing/About";
import Work from "./components/Landing/Work";
import Testimonial from "./components/Landing/Testimonial";
import Contact from "./components/Landing/Contact";
import Footer from "./components/Landing/Footer";
import Layout from "./components/Layout/Layout"
import { Fragment, useRef } from 'react';



// function Layout() {
//   const home = useRef();
//   const about = useRef();
//   const testimonial = useRef();
//   const contact = useRef();

//   const scrollHandler = (elmRef) => {
//     console.log(elmRef.current);
//     window.scrollTo({top: elmRef.current.offsetTop, behavior: "smooth"});
//   };
//   return (
//     <div>
//       <div ref={home}><Home /></div>
//       <div ref={about}><About /></div>
//       <div ><Work /></div>
//       <div ref={testimonial}><Testimonial /></div>
//       <div ref={contact}><Contact /></div>
//       <div><Footer /></div>
//     </div>
//   );
// }

function App() {
  const user = localStorage.getItem("token")
  return (
    
    <Routes>/
      <Route path='*' element={<Layout />} />
      {user && <Route path='/' exact element={<Main/>} />}
      <Route path='/signup' exact element={<Signup/>} />
      <Route path='/login' exact element={<Login/>} />
      <Route path='/' exact element={<Navigate replace to="/*"/>} />
    </Routes>
  );
}

export default App;
