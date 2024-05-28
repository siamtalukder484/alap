import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import activeMsgSlice from '../slices/activeMsgSlice'

export const store = configureStore({
  reducer: {
    logedinUserData: authSlice,
    activeChatUser: activeMsgSlice,
  },
})