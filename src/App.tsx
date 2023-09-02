import React from 'react';
import "./App.scss";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Statistics from "./components/Statistics";
import Game from "./components/Game";
import Bar from "./components/Bar";

import { useSelector } from "react-redux";
import { selectModalStatus } from "./reducers/modalSlice";
import Restart from "./components/Restart";

function App() {
  const { visible } = useSelector(selectModalStatus);
  return (
    <div className="App">
      <Header title="Wordle Clone" />
      <Game />
      {visible && (
        <Modal
          title="İSTATİSTİK"
          width="30%"
        >
          <Statistics />
          <Bar />
        </Modal>
      )}
      <Restart></Restart>
    </div>
  );
}

export default App;
