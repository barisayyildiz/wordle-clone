import { configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import modalReducer from "./modalSlice"
import wordReducer from "./wordSlice"
import timeReducer from "./timeSlice"
import gameReducer from "./gameSlice"

const reducers = combineReducers({
  modal: modalReducer,
  word: wordReducer,
  time: timeReducer,
  game: gameReducer
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
