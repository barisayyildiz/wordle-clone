import { useState, useEffect } from "react";
import "./App.scss";

import Header from "./components/Header";
import Modal from "./components/Modal";
import Statistics from "./components/Statistics";
import Game from "./components/Game";
import Bar from "./components/Bar";

import { useSelector, useDispatch } from  "react-redux"
import {
  toggle,
  selectModalStatus,
} from "./reducers/modalSlice"

import { selectWord } from "./reducers/wordSlice"

function App() {
  const [isStatisticsModalOpen, setStatisticsModalOpen] = useState(true);

  const { visible } = useSelector(selectModalStatus);
  const { selectedWord } = useSelector(selectWord)
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Header title="Wordle Clone"/>
      <Game setModalStatus={setStatisticsModalOpen} />
      {visible && (
        <Modal
          title="İSTATİSTİK"
          width="30%"
          closeModal={setStatisticsModalOpen}
          setStatisticsModalOpen={setStatisticsModalOpen}
        >
          <Statistics />
          <Bar />
        </Modal>
      )}
    </div>
  );
}

export default App;
