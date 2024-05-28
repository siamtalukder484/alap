import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: null,
}

export const activeMsgSlice = createSlice({
  name: 'activemsg',
  initialState,
  reducers: {
    activeChatUser: (state, action) => {
        state.value = action.payload
      },
  },
})

export const { activeChatUser } = activeMsgSlice.actions

export default activeMsgSlice.reducer