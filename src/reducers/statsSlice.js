import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  played: 0,
  win: 0,
  curStreak: 0,
  maxStreak: 0
}

const getInitialState = () => {
  try{
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).game)
  }catch(e){
    return initialState
  }
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState : getInitialState(),
  reducers:{
    addPlay: (state) => {
      state.played = state.played + 1
    },
    addWin: (state) => {
      state.win = state.win + 1
    },
    resetStreak: (state) => {
      state.curStreak = 0
    },
    incrementStreak: (state) => {
      state.curStreak = state.curStrek + 1
      if(state.curStreak+1 > state.maxStreak){
        state.maxStreak = state.curStreak
      }
    }
  }
})

export const { addPlay, addWin, resetStreak, incrementStreak } = statsSlice.actions
export const selectStats = (state) => state.stats
export default statsSlice.reducer

