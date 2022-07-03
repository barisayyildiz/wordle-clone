import { useState } from "react"
import './App.scss';

import Header from "./Header"
import Modal from "./Modal"
import Statistics from "./Statistics"
import Game from "./Game"



function App() {

	const [isStatisticsModalOpen, setStatisticsModalOpen] = useState(false)

  return (
    <div className="App">
      <Header
				title="Wordle Clone"
				isStatisticsModalOpen={isStatisticsModalOpen}
				setStatisticsModalOpen={setStatisticsModalOpen}
			/>

			<Game
				setModalStatus={setStatisticsModalOpen}
			/>

			{
				isStatisticsModalOpen && (
					<Modal
						title="İSTATİSTİK"
						width="30%"
						closeModal={setStatisticsModalOpen}
						setStatisticsModalOpen={setStatisticsModalOpen}
					>
						<Statistics
							played={0}
							winPer={0}
							curStreak={0}
							maxStreak={0}
						/>
					</Modal>
				)
			}


    </div>
  );
}

export default App;
