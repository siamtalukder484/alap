import React, { useEffect, useState } from 'react'
import './homepage.css'
import CardHeading from '../utilities/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([])
  const data = useSelector((state) => state.logedinUserData.value)


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



let handleFriendRequest = (freqinfo) => {
  // console.log(freqinfo);
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
          {userList.map((item,index)=>(
            <div key={index} className='useritem'>
              <div className="imgbox"></div>
              <div className='userinfo'>
                <div>
                  <h4>{item.displayName}</h4>
                  <p>MERN Stack</p>
                </div>
                <button onClick={()=>handleFriendRequest(item)} >Add</button>
              </div>
            </div>
          ))
          }
            
        </div>
    </div>
  )
}

export default UserList