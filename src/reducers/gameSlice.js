import { createSlice } from "@reduxjs/toolkit"
import { dayHasChanged } from "../lib/util"

const initialState = {
  board : [],
  numberOfGuesses: 0,
  onNthGuess : null
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

export const gameSlice = createSlice({
  name: 'game',
  initialState : getInitialState(),
  reducers:{
    updateBoard: (state, payload) => {
      state.board = payload.board
    }
  }
})

export const { updateBoard } = gameSlice.actions
export const selectBoard = (state) => state.game
export default gameSlice.reducer

