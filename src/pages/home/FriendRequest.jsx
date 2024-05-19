import React, { useEffect, useState } from 'react'
import CardHeading from '../../components/utilities/CardHeading'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { dark } from '@mui/material/styles/createPalette';
import { useSelector, useDispatch } from 'react-redux'

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

  return (
    <div className='box'>
        <CardHeading text="Friend Request" />
        <div className='useritembox'>
          {friendReqList.map((item,index)=>(
            <div key={index} className='useritem'>
              <div className="imgbox"></div>
              <div className='userinfo'>
                <div>
                  <h4>{item.whosendName}</h4>
                  <p>MERN Stack</p>
                </div>
                <div>
                    <button>confirm</button>
                    <button>delete</button>
                </div>
              </div>
            </div>
          ))
          }
            
        </div>
    </div>
  )
}

export default FriendRequest