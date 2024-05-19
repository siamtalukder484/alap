import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../pages/auth/Login';
import { Outlet } from 'react-router-dom';

const IsLogedinUser = () => {

    const data = useSelector((state) => state.logedinUserData.value)

  return data ? <Outlet/> : <Login/>
}

export default IsLogedinUser