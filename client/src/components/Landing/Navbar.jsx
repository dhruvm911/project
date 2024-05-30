import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import Logo from '../../assets/Logo.svg'
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = ({ scrollHandler, refs }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonials",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <nav>
      <div className={styles.nav_logo_container}>
        <img src={Logo} alt="" />
      </div>
      <div className={styles.navbar_links_container}>
        <a onClick={() => scrollHandler(refs.home)} href="#">Home</a>
        <a onClick={() => scrollHandler(refs.about)} href="#">About</a>
        <a onClick={() => scrollHandler(refs.work)} href='#'>Work</a>
        <a onClick={() => scrollHandler(refs.testimonial)} href="#">Testimonials</a>
        <a onClick={() => scrollHandler(refs.contact)} href="#">Contact</a>
        
        {/* <a href="">
          <BsCart2 className={styles.navbar_cart_icon} />
        </a> */}
        <Link to="/login"><button className={styles.primary_button}>SIGN IN</button></Link>
      </div>
      <div className={styles.navbar_menu_container}>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
