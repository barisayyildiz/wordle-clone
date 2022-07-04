import React, { useState, useEffect, useRef } from 'react'
import './style.scss'

import Cell from "../Cell"

import { checkWord } from "../Game/util"

function Row(props) {
	const {
		guessedWords,
		index,
		value,
		WORD
	} = props
	const isActive = guessedWords.length === index

	const ref = useRef(null)

	const colors = index < guessedWords.length ? checkWord(value, WORD) : []
	const finished = index < guessedWords.length
	const success = value === WORD

	return(
		<div className="game_row">
			{
				Array.from(Array(5).keys()).map(key => {
					return(
						<Cell
							{...props}
							color={colors[key]}
							value={value[key]}
							key={key}
							index={key}
							finished={finished}
							continues={isActive && props.activeGuess.length > key}
							// notFound={false}
							success={success}
						/>
					)
				})
			}			
		</div>
	)
}

export default Row