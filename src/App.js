import { useState, useEffect } from "react";
import "./App.scss";

import Header from "./Header";
import Modal from "./Modal";
import Statistics from "./Statistics";
import Game from "./Game";
import Bar from "./Bar";

import { useSelector, useDispatch } from  "react-redux"
import {
  toggle,
  selectModalStatus,
} from "./reducers/modalSlice"

import {
  selectWord
} from "./reducers/wordSlice"

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
          <Statistics played={0} winPer={0} curStreak={0} maxStreak={0} />
          <Bar 
            distribution={[1, 0, 0, 0, 0, 0]}
            active={1} 
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
