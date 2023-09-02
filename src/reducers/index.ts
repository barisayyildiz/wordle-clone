import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import modalReducer from "./modalSlice";
import wordReducer from "./wordSlice";
import gameReducer from "./gameSlice";
import statsReducer from "./statsSlice";
import animationReducer from "./animationSlice";

const reducers = combineReducers({
  modal: modalReducer,
  word: wordReducer,
  game: gameReducer,
  stats: statsReducer,
  animation: animationReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal", "animation"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

