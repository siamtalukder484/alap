import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./profile.css"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {
    const db = getDatabase();
    const [profileUser, setProfileUser] = useState([])
    const data = useSelector((state) => state.logedinUserData.value)
    const { id } = useParams();

    useEffect(()=>{
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(item.key == id){
              arr.push({...item.val(), id: item.key})
            }
          })
          setProfileUser(arr)
        });
      },[])

      console.log(profileUser);


  return (
    <>
        <div>
            <div className='coverphoto'></div>
            <div style={{marginTop: "20px",display: "flex", gap: "30px", alignItems: "center"}}>
                <div className='profilephoto'></div>
                <div className='profileinfo'>
                    <h3>{profileUser[0]?.displayName}</h3>
                    <p>Developer</p>
                </div>
            </div>
        </div>
    </>
    // <div>Profile id: {id}</div>
  )
}

export default Profile