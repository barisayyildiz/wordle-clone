import { createSlice } from "@reduxjs/toolkit"

export const modalSlice = createSlice({
  name:'modal',
  initialState:{
    visible:false
  },
  reducers:{
    toggle : (state) => {
      state.visible = !state.visible
    }
  }
})

export const { toggle } = modalSlice.actions
export const selectModalStatus = state => state.modal
export default modalSlice.reducer
