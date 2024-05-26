import React, { useEffect, useState } from 'react'
import CardHeading from '../../components/utilities/CardHeading'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { dark } from '@mui/material/styles/createPalette';
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@mui/material';

const FriendRequest = () => {
    const db = getDatabase();
    const [friendReqList, setfriendReqList] = useState([])
    const data = useSelector((state) => state.logedinUserData.value)

    useEffect(()=>{
        const friendReqRef = ref(db, 'friendrequest');
        onValue(friendReqRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == item.val().whoreceiveid){
                arr.push({...item.val(), id: item.key})            
            }
          })
          setfriendReqList(arr)
        });
      },[])

      //Request Delete
    const handleReqDelete = (deleteinfo) => {
      remove(ref(db, "friendrequest/" + deleteinfo.id)).then(()=>{
        console.log("delete done");
      })
    }

    //confirm request
    const handleReqConfirm = (confirminfo) =>{
        set(push(ref(db, "friends")),{
            senderid: confirminfo.whosendid,
            senderemail: confirminfo.whosendemail, 
            sendername: confirminfo.whosendName,
            receiverid: data.uid,
            receiveremail: data.email,
            receivername: data.displayName,
        }).then(()=>{
          remove(ref(db, "friendrequest/" + confirminfo.id)).then(()=>{
            console.log("confirm done");
          })
        })
    }

  return (
    <div className='box'>
        <CardHeading text="Friend Request" />
        <div className='useritembox'>
          {friendReqList.length > 0 ?
          friendReqList.map((item,index)=>(
            <div key={index} className='useritem'>
              <div className="imgbox"></div>
              <div className='userinfo'>
                <div>
                  <h4>{item.whosendName}</h4>
                  <p>MERN Stack</p>
                </div>
                <div>
                    <button onClick={()=>handleReqConfirm(item)}>confirm</button>
                    <button onClick={()=>handleReqDelete(item)}>delete</button>
                </div>
              </div>
            </div>
          ))
          :
          <Alert severity="info">No request found</Alert>
          }
            
        </div>
    </div>
  )
}

export default FriendRequest