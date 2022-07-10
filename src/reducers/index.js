import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import modalReducer from "./modalSlice";
import wordReducer from "./wordSlice";
import timeReducer from "./timeSlice";
import gameReducer from "./gameSlice";
import statsReducer from "./statsSlice";

const reducers = combineReducers({
  modal: modalReducer,
  word: wordReducer,
  time: timeReducer,
  game: gameReducer,
  stats: statsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
