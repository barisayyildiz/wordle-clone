import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  played: 0,
  win: 0,
  curStreak: 0,
  maxStreak: 0,
  distribution: Array(6).fill(0),
  active: null,
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
    incrementPlay: (state) => {
      state.played = state.played + 1
    },
    incrementWin: (state) => {
      state.win = state.win + 1
      state.curStreak = state.curStreak + 1
      if(state.curStreak + 1 >= state.maxStreak){
        state.maxStreak = state.curStreak
      }
    },
    updateDistribution: (state, { payload }) => {
      state.distribution = payload
    },
    setActive: (state, { payload }) => {
      state.active = payload
      state.distribution = state.distribution.map((item,index) => {
        if(index + 1 == payload){
          return item+1
        }
        return item
      })
    }
  }
})

export const { incrementPlay, incrementWin, updateDistribution, setActive } = statsSlice.actions
export const selectStats = (state) => state.stats
export default statsSlice.reducer

