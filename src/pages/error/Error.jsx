import React from 'react'
import Images from '../../components/utilities/Images'
import errorimg from '../../assets/images/error.png'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Images source={errorimg}/>
      </div>
      
      <Link style={{background: "blueviolet", color: "white", padding: "10px 30px", borderRadius: "8px", textAlign: "center"}} to="/">Back to Home</Link>
    </div>
  )
}

export default Error