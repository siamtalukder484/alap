import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment/moment';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getStorage, ref as sref, uploadBytes,getDownloadURL,uploadString  } from "firebase/storage";
import { AiFillLike } from 'react-icons/ai';



  
const MsgBox = () => {
    const storage = getStorage();
    const db = getDatabase();
    const data = useSelector((state) => state.logedinUserData.value)
    const activeChatData = useSelector((state) => state.activeChatUser.value)
    const [msgText, setMsgText] = useState("")
    const [allMsg, setAllMsg] = useState([])
    const [emojishow, setEmojishow] = useState(false)

    let [voicebox, setVoicebox] = useState(true)
    let [audiourl, setAudioUrl] = useState("");
    let [blob, setBlob] = useState("");


    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        setAudioUrl(url);
        setBlob(blob);
      };
      let handleAudioUpload = () => {
        const audioStorageRef = sref(storage, 'voice/'+ Date.now());
        uploadBytes(audioStorageRef, blob).then((snapshot) => {
          getDownloadURL(audioStorageRef).then((downloadURL) => {
            set(push(ref(db, "message")), {
                senderid: data?.uid,
                sendername: data?.displayName,
                senderemail: data?.email,
                receivername: activeChatData.senderid == data.uid ? activeChatData.receivername : activeChatData.sendername,
                receiveremail: activeChatData.senderid == data.uid ? activeChatData.receiveremail : activeChatData.senderemail,
                receiverid: activeChatData.senderid == data.uid ? activeChatData.receiverid : activeChatData.senderid,
                audio: downloadURL,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
            }).then(() => {
              setAudioUrl("");
            });
          });
        });
      };

      let handleSendLike = () => {
        set(push(ref(db, "message")), {
            senderid: data?.uid,
            sendername: data?.displayName,
            senderemail: data?.email,
            receivername: activeChatData.senderid == data.uid ? activeChatData.receivername : activeChatData.sendername,
            receiveremail: activeChatData.senderid == data.uid ? activeChatData.receiveremail : activeChatData.senderemail,
            receiverid: activeChatData.senderid == data.uid ? activeChatData.receiverid : activeChatData.senderid,
            like: "&#128077;",
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(() => {
          console.log("like hoice");
        });
    }

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
            setMsgText("")
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


      let handleEmoji = (e) => {
        setMsgText(msgText + e.emoji)
        // console.log(e.emoji)
      }
      let handleEnterPress = (e) => {
        if(e.key == "Enter"){
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
                setMsgText("")
            })
        }
      }

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
            <ScrollToBottom className="msgbody">
                {allMsg.map((item,index)=>(
                    item.senderid == data.uid ?
                    <div className='sendmsgmain'>
                        {item.message ?
                            <p className='sendmsg'>{item.message}</p>
                        :
                            item.audio ?
                            <audio className='sendaudio' controls src={item.audio}/>
                            : 
                            <div dangerouslySetInnerHTML={{__html: item.like}}></div>
                        }
                        <span className='date'>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                    :
                    <div className={`receivemsgmain ${item.message ? "" : "audio"}`}>
                        {item.message ?
                        <p className='receivemsg'>
                            <span>
                                {item.message}
                            </span>
                        </p>
                        :
                            item.audio ?
                                <audio controls src={item.audio}/>
                            : 
                            <div dangerouslySetInnerHTML={{__html: item.like}}></div>
                        }
                        <span className='date'>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                    </div>
                ))
                }
            </ScrollToBottom>
            <div className="msgfooter">
                {audiourl && (
                    <div className="voice_send_wrapper">
                    <audio controls src={audiourl}></audio>
                    <div className='voice_btn_wrapper'>
                        <button
                            className=""
                            onClick={() => setAudioUrl("")}
                        >
                            Delete
                        </button>
                        <button
                            onClick={handleAudioUpload}
                            className=""
                        >
                            Send
                        </button>
                    </div>
                    </div>
                )}
                <div style={{display: "flex", alignItems: "center",  gap: "10px", position: "relative"}}>
                    <button onClick={()=>setEmojishow(!emojishow)}>Emoji</button>
                    <div style={{position: "absolute", left: "0", bottom:"60px"}}>
                        <EmojiPicker onEmojiClick={handleEmoji} open={emojishow} />
                    </div>
                    <AudioRecorder 
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }} 
                        downloadFileExtension={"mp3"}
                        />
                    <input onKeyUp={handleEnterPress} onChange={(e)=>setMsgText(e.target.value)} type='text' className='msginput' value={msgText} placeholder='Enter your msg'/>
                    {msgText.length > 0 ?
                    <button onClick={handleSubmitMsg} className='sendbtn'>send</button>
                    :
                    <div onClick={handleSendLike} className='like_icon'>
                        <AiFillLike style={{cursor: "pointer", color: "#fff", fontSize: "25px"}} />
                    </div>
                    }
                </div>
            </div>
        </div>

    }
    </>
  )
}

export default MsgBox