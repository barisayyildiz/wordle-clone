import { createSlice } from "@reduxjs/toolkit"
import { dayHasChanged, selectAWord } from "../lib/util"

const initialState = {
  selectedWord : selectAWord()
}

const getInitialState = () => {
  try{
    if(dayHasChanged()){
      return initialState
    }
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).word)
  }catch(e){
    return initialState
  }
}

export const wordSlice = createSlice({
  name: 'word',
  initialState: {
    selectedWord: selectAWord()
  },
  reducers:{
    changeSelection: (state) => {
      state.selectedWord = selectAWord()
    }
  }
})

export const { changeSelection } = wordSlice
export const selectWord = (state) => state.word
export default wordSlice.reducer

