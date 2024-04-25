import React from 'react'
import './layouts.css'
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";


const Sidebar = () => {
  return (
    <div className='sidebarmain'>
      <div className='sidebar_inner'>
        <div className='profileimg'>
          <Avatar
            alt="aemy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div style={{}}>
          <ul className='sidebarul'>
            <li>
              <NavLink to="/home">
                <IoHomeOutline className='' />
              </NavLink>
            </li>
            <li>
              <NavLink to="/message">
                <AiOutlineMessage className='' />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notification" >
                <IoIosNotificationsOutline className='' />
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <IoSettingsOutline className='' />
              </NavLink>
            </li>
          </ul>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <button className='logoutbtn'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar