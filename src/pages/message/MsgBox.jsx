import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const MsgBox = () => {
    
    const data = useSelector((state) => state.logedinUserData.value)
    const activeChatData = useSelector((state) => state.activeChatUser.value)
    const [msgText, setMsgText] = useState("")

    
    const handleSubmitMsg = () => {
        console.log(msgText);
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
            <div className="msgbody">
                <div className='sendmsgmain'>
                    <p className='sendmsg'>hello</p>
                </div>
                <div className='receivemsgmain'>
                    <p className='receivemsg'>hello</p>
                </div>
                <div className='sendmsgmain'>
                    <p className='sendmsg'>hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ad porro itaque voluptas, pariatur ipsum praesentium maiores aut? Minus corrupti dolores cumque voluptatem laudantium, totam esse aliquid similique, dolor nostrum iure? Laudantium cupiditate velit at rem sequi nobis quis quam quasi itaque nam. Praesentium, molestiae aliquam eaque excepturi aut deleniti.</p>
                </div>
                <div className='receivemsgmain'>
                    <p className='receivemsg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur at nam molestiae? Culpa voluptas atque autem distinctio cupiditate ut error. Nemo excepturi sunt, at facere sapiente perspiciatis praesentium nulla quaerat officiis saepe ullam, non reprehenderit obcaecati beatae pariatur repellat hic veniam quod, fuga impedit. Ex provident sint ducimus repudiandae necessitatibus quisquam? Ea debitis magni commodi eum obcaecati? Quo ipsum aspernatur maxime error, doloribus perspiciatis architecto inventore magnam accusamus, commodi quos!</p>
                </div>
                <div className='sendmsgmain'>
                    <p className='sendmsg'>hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ad porro itaque voluptas, pariatur ipsum praesentium maiores aut? Minus corrupti dolores cumque voluptatem laudantium, totam esse aliquid similique, dolor nostrum iure? Laudantium cupiditate velit at rem sequi nobis quis quam quasi itaque nam. Praesentium, molestiae aliquam eaque excepturi aut deleniti.</p>
                </div>
            </div>
            <div className="msgfooter">
                <div style={{display: "flex", alignItems: "center",  gap: "10px"}}>
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