import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';

const MsgBox = () => {
    const db = getDatabase();
    const data = useSelector((state) => state.logedinUserData.value)
    const activeChatData = useSelector((state) => state.activeChatUser.value)
    const [msgText, setMsgText] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [emojishow, setEmojishow] = useState(false)
    // console.log(activeChatData)
    //message write
    const handleSubmitMsg = () => {
        set(push(ref(db, "message")),{
            senderid: data?.uid,
            sendername: data?.displayName,
            senderemail: data?.email,
            receivername: activeChatData.senderid == data.uid ? activeChatData.receivername : activeChatData.sendername,
            receiveremail: activeChatData.senderid == data.uid ? activeChatData.receiveremail : activeChatData.senderemail,
            receiverid: activeChatData.senderid == data.uid ? activeChatData.receiverid : activeChatData.senderid,
            message: msgText,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(()=>{
            console.log("msg sent successfully");
        })
    }
    //message read
    useEffect(()=>{
        const usersRef = ref(db, 'message');
        onValue(usersRef, (snapshot) => {
          let arr = []
          let activeid = data.uid == activeChatData?.senderid ? activeChatData?.receiverid : activeChatData?.senderid
          snapshot.forEach((item)=>{
              if((item.val().senderid == data.uid && item.val().receiverid ==activeid) || (item.val().senderid == activeid && item.val().receiverid == data.uid)){
                arr.push({...item.val(), id: item.key})
            }
          })
          setAllMsg(arr)
        });
      },[activeChatData])

      console.log(allMsg);



  return (
    <>{!activeChatData ?
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
            <h1>Please select a user</h1>
        </div>
        :
        <div className='msgmain'>
            <div className="msgheading">
                <div className="imgbox"></div>
                <div>
                    <h3>
                    {activeChatData.receiverid == data.uid ?
                        activeChatData.sendername
                        :
                        activeChatData.receivername
                    }
                    </h3>
                    <p>Active Now</p>
                </div>
            </div>
            <div className="msgbody">
                {allMsg.map((item,index)=>(
                    item.senderid == data.uid ?
                    <div className='sendmsgmain'>
                        <p className='sendmsg'>{item.message}</p>
                        <span className='date'>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                    :
                    <div className='receivemsgmain'>
                        <p className='receivemsg'>
                            <span>
                                {item.message}
                            </span>
                        </p>
                        <span className='date'>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                ))

                }
                
            </div>
            <div className="msgfooter">
                <div style={{display: "flex", alignItems: "center",  gap: "10px", position: "relative"}}>
                    <button onClick={()=>setEmojishow(!emojishow)}>Emoji</button>
                    <div style={{position: "absolute", left: "0", bottom:"60px"}}>
                        <EmojiPicker open={emojishow} />
                    </div>
                    <input onChange={(e)=>setMsgText(e.target.value)} type='text' className='msginput' placeholder='Enter your msg'/>
                    {msgText.length > 0 &&
                    <button onClick={handleSubmitMsg} className='sendbtn'>send</button>

                    }
                </div>
            </div>
        </div>

    }
    </>
  )
}

export default MsgBox