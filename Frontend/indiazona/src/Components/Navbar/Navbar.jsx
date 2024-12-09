import React from 'react'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Avatar from '@mui/material/Avatar';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='Navbar-Container'>
      <div> <h3>Sub Categories</h3></div>
      <div>
      <NotificationsOutlinedIcon/>
      <button>Eng <span><ArrowDropDownOutlinedIcon/></span></button>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <p>Admin</p></div>
     
     

    </div>
  )
}

export default Navbar