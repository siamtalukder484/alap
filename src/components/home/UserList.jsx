import React from 'react'
import './homepage.css'
import CardHeading from '../utilities/CardHeading'

const UserList = () => {
  return (
    <div className='box'>
        <CardHeading text="User List" />
        <div className='useritembox'>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
            <div className='useritem'></div>
        </div>
    </div>
  )
}

export default UserList