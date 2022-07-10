import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./reducers";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { selectAWord } from "./lib/util";

const initLocalStorage = () => {
  // if(localStorage.getItem('board') === null){
  //   localStorage.setItem('board', JSON.parse({
  //     board: [],
  //     numberOfGuesses: 0,
  //     onNthGuess: null
  //   }))
  // }

  if (localStorage.getItem("day") === null) {
    localStorage.setItem("day", new Date().getDay());
  }
  if (localStorage.getItem("selectedWord") === null) {
    localStorage.setItem("selectedWord", selectAWord());
  }
};
initLocalStorage();

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
