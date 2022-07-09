import { createSlice } from "@reduxjs/toolkit"
import { dayHasChanged } from "../lib/util"

const initialState = {
  day: new Date().getDay()
}

const getInitialState = () => {
  try{
    if(dayHasChanged()){
      return initialState
    }
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).game)
  }catch(e){
    return initialState
  }
}

export const timeSlice = createSlice({
  name: 'time',
  initialState: getInitialState(),
  reducers:{
    changeDay: (state) => {
      state.day = new Date().getDay()
    }
  }
})

export const { changeDay } = timeSlice
export const selectTime = (state) => state.time
export default timeSlice.reducer

