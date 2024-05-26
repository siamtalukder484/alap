import React, { useEffect, useState } from 'react'
import CardHeading from '../utilities/CardHeading'
import { Alert } from '@mui/material'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Friends = () => {

    const [friendsList, setFriendsList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.logedinUserData.value)

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

      //block operation

      const handleBlock = (blockinfo) => {
        console.log(blockinfo);
        // set(push(ref(db, "block")),{
        //     blockkaiceid: blockinfo.receiverid,
        //     blockkaiceemail: blockinfo,
        //     blockkaicename: blockinfo,
        //     blockdiceaid: blockinfo,
        //     blockdiceaemail: blockinfo,
        //     blockdiceaname: blockinfo,
        // })
      }
      

  return (
    <div className='box'>
        <CardHeading text="Friend List" />
        <div className='useritembox'>
            {friendsList.length > 0
            ? friendsList.map((item,index)=>(
                <div key={index} className='useritem'>
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
                    <div>
                        <button>Unfriend</button>
                        <button onClick={()=>handleBlock(item)}>Block</button>
                    </div>
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

export default Friends