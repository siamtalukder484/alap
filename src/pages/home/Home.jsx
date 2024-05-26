import React from 'react'
import UserList from '../../components/home/UserList'
import FriendRequest from './FriendRequest'
import Friends from '../../components/home/Friends'

const Home = () => {
  return (
    <div style={{display: "flex", flexWrap: "wrap", marginTop: "30px", gap: "25px"}}>
      <div style={{}}>
        <UserList/>
      </div>
      <div>
        <FriendRequest/>  
      </div>
      <div>
        <Friends/>
      </div>
    </div>
  )
}

export default Home