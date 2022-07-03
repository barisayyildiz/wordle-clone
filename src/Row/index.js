import React, { useState, useEffect } from 'react'
import './style.scss'

import Cell from "../Cell"

import { checkWord } from "../Game/util"

function Row(props) {

	const [string, setString] = useState("")

	const {
		isGameOver,
		setGameOver,
		guessedWords,
		setGuessedWords,
		index,
		value,
		WORD
	} = props
	const isActive = guessedWords.length === index

	const colors = index < guessedWords.length ? checkWord(value, WORD) : []
	const finished = index < guessedWords.length

	return(
		<div className="game_row">
			{
				Array.from(Array(5).keys()).map(key => {
					return(
						<Cell
							style={{
								backgroundColor:colors[key],
								color:finished ? 'white' : 'black'
							}}
							value={value[key]}
							key={key}
							finished={finished}
						/>
					)
				})
			}			
		</div>
	)
}

export default Row