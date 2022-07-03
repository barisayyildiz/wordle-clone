import React, { useState, useEffect } from 'react'
import './style.scss'

import Cell from "../Cell"

function Row(props) {

	const [string, setString] = useState("")

	const {
		isGameOver,
		setGameOver,
		guessedWords,
		setGuessedWords,
		index,
		value
	} = props
	const isActive = guessedWords.length === index

	return(
		<div className="game_row">
			{
				Array.from(Array(5).keys()).map(key => {
					return(
						<Cell
							value={value[key]}
							key={key}
						/>
					)
				})
			}			
		</div>
	)
}

export default Row