import React from 'react'
import MsgFriend from './MsgFriend'
import MsgBox from './MsgBox'

const Message = () => {
  return (
    <div style={{display: "flex", alignItems: "start"}}>
      <MsgFriend/>
      <MsgBox/>
    </div>
  )
}

export default Message