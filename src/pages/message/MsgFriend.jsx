import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import CardHeading from '../../components/utilities/CardHeading';
import { activeChatUser } from '../../slices/activeMsgSlice';

const MsgFriend = () => {

    const [friendsList, setFriendsList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.logedinUserData.value)
    const activeChatData = useSelector((state) => state.activeChatUser.value)
    const dispatch = useDispatch()


    useEffect(()=>{
        const usersRef = ref(db, 'friends');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
              if(item.val().senderid == data.uid || item.val().receiverid == data.uid){
                arr.push({...item.val(), id: item.key})
            }
          })
          setFriendsList(arr)
        });
      },[])


      const handleChat = (chatinfo) => {
        // console.log(chatinfo);
        dispatch(activeChatUser(chatinfo))
      }

  return (
    <div className='box msg'>
        <CardHeading text="Friend List" />
        <div className='useritembox'>
            {friendsList.length > 0
            ? friendsList.map((item,index)=>(
                <div onClick={()=>handleChat(item)} key={index} className='useritem msg'>
                    <div className="imgbox"></div>
                    <div className='userinfo'>
                        <div>
                        <h4>{item.receiverid == data.uid ?
                        item.sendername
                        :
                        item.receivername
                        }</h4>
                        <p>MERN Stack</p>
                        </div>
                        {/* <div>
                            <button>Unfriend</button>
                            <button onClick={()=>handleBlock(item)}>Block</button>
                        </div> */}
                    </div>
                </div>
            ))
            :
            <Alert severity="info">No Friends found</Alert>
            }
        </div>
    </div>
  )
}

export default MsgFriend