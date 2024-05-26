import React, { useEffect, useState } from 'react'
import './homepage.css'
import CardHeading from '../utilities/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const [freqList, setfreqList] = useState([])
  const [friends, setFriends] = useState([])
  const data = useSelector((state) => state.logedinUserData.value)

// all users list
useEffect(()=>{
  const usersRef = ref(db, 'users');
  onValue(usersRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(item.key != data.uid){
        arr.push({...item.val(), id: item.key})
      }
    })
    setUserList(arr)
  });
},[])

// friend request  list 
useEffect(()=>{
  const usersRef = ref(db, 'friendrequest');
  onValue(usersRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(data.uid == item.val().whosendid || data.uid == item.val().whoreceiveid){
        arr.push(item.val().whosendid + item.val().whoreceiveid)
      }
    })
    setfreqList(arr)
  });
},[])

//friend list
useEffect(()=>{
  const usersRef = ref(db, 'friends');
  onValue(usersRef, (snapshot) => {
    let arr = []
    snapshot.forEach((item)=>{
      if(item.val().senderid == data.uid || item.val().receiverid == data.uid){
        arr.push(item.val().senderid + item.val().receiverid)
      }
    })
    setFriends(arr)
  });
},[])
console.log(friends);



let handleFriendRequest = (freqinfo) => {
  set(push(ref(db, "friendrequest")),{
    whosendid: data.uid,
    whosendemail: data.email,
    whosendName: data.displayName,
    whoreceiveid: freqinfo.id,
    whoreceiveemail: freqinfo.email,
    whoreceiveName: freqinfo.displayName
  }).then(()=>{
    console.log("ok");
  })
}

  return (
    <div className='box'>
        <CardHeading text="User List" />
        <div className='useritembox'>
          {userList.length > 0
          ?
          userList.map((item,index)=>(
            <div key={index} className='useritem'>
              <div className="imgbox"></div>
              <div className='userinfo'>
                <div>
                  <Link to={`/profile/${item.id}`}>
                    <h4>{item.displayName}</h4>
                  </Link>
                  <p>MERN Stack</p>
                </div>
                {freqList.includes(data.uid + item.id) || freqList.includes(item.id + data.uid)
                  ?
                  <button >Cancel</button>
                  :
                    friends.includes(data.uid + item.id) || friends.includes(item.id + data.uid)
                    ?
                    <button>Friend</button>                    
                    :
                    <button onClick={()=>handleFriendRequest(item)} >Add</button>
                }
              </div>
            </div>
          ))
          :
          <Alert severity="info">No Suggest user found</Alert>
          }
            
        </div>
    </div>
  )
}

export default UserList