import React, { useEffect } from 'react'
import './layouts.css'
import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logedinUser } from '../../slices/authSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Sidebar = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const data = useSelector((state) => state.logedinUserData.value)
  const dispatch = useDispatch()


  // useEffect(()=>{
  //   if(data){
  //     console.log("login first");
  //   }else{
  //     navigate("/")
  //   }
  // },[])

  const handleSignOut = () => {
    signOut(auth).then(() => {
       navigate("/")
       localStorage.removeItem("loggedinUser")
       dispatch(logedinUser(null))
    }).catch((error) => {
      // An error happened.
    });
  }

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
        <div style={{width: "100%"}}>
        
          <p style={{textAlign: "center", color: "white", padding: "10px 0"}}>
            {/* {data?.displayName} */}
            {data ?
              data.displayName
            :
            <Skeleton style={{width: "70%", margin: "0 auto", height: "35px"}} />
            }
          </p>
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
            <button onClick={handleSignOut} className='logoutbtn'>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar