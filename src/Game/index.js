import React, { useState, useEffect } from 'react'
import "./style.scss"

import Row from "../Row"

function Game(props) {
	const [isGameOver, setGameOver] = useState(false)
	const [guessedWords, setGuessedWords] = useState([])
	const [activeGuess, setActiveGuess] = useState('')

	const propsToBeSent = {
		isGameOver,
		setGameOver,
		guessedWords,
		setGuessedWords,
		activeGuess,
		setActiveGuess
	}

	useEffect(() => {
		console.log("game oluştu")

		const handleKey = (event) => {

			// kelime kontrol edilmeli
			if(event.key === 'Enter'){
				if(activeGuess.length < 5){
					return
				}
				console.log(activeGuess)
				setGuessedWords([...guessedWords, activeGuess])
				setActiveGuess('')
				console.log(guessedWords)
				return	
			}

			if(event.key === 'Backspace'){
				setActiveGuess(activeGuess => activeGuess.slice(0,activeGuess.length - 1))
				return
			}

			if(activeGuess.length === 5){
				return
			}

			const pattern = /[a-z]|[A-Z]|ı|ş|ö|ç|ğ|ü/
			// invalid char
			if(!pattern.test(event.key) || event.key.length !== 1){
				return
			}

			setActiveGuess(activeGuess => activeGuess + event.key)
			console.log(event.key)
		}

		document.addEventListener('keydown', handleKey)
		return () => {
			console.log("event listener removed")
			return document.removeEventListener('keydown', handleKey)
		}
	}, [activeGuess])

	return(
		<div className="game_container">
			{
				Array.from(Array(6).keys()).map(key => {
					return <Row
						key={key}
						index={key}
						value={guessedWords[key] !== undefined ? guessedWords[key] : (key == guessedWords.length ? activeGuess : '')}
						{...propsToBeSent}
					/>
				})
			}
			{
				activeGuess
			}
			<br/>
			{
				guessedWords.join(",")
			}
		</div>
	)
}

export default Game