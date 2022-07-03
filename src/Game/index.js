import React, { useState, useEffect } from 'react'
import "./style.scss"

import { checkWord } from "./util"

import Row from "../Row"

function Game(props) {
	const [isGameOver, setGameOver] = useState(false)
	const [isGameSuccess, setGameSuccess] = useState(false)
	const [guessedWords, setGuessedWords] = useState([])
	const [activeGuess, setActiveGuess] = useState('')

	const WORD = 'KOLAY'

	const { setModalStatus } = props

	const propsToBeSent = {
		isGameOver,
		setGameOver,
		guessedWords,
		setGuessedWords,
		activeGuess,
		setActiveGuess,
		isGameSuccess,
		setGameSuccess,
		WORD
	}

	const openModalAfterSomeTime = (ms) => {
		setTimeout(() => {
			setModalStatus(true)
		}, ms)
	}

	useEffect(() => {
		console.log("game oluştu")

		const handleKey = (event) => {

			if(isGameSuccess || isGameOver){
				return
			}

			// kelime kontrol edilmeli
			if(event.key === 'Enter'){
				if(activeGuess.length < 5){
					return
				}
				
				if(guessedWords.length == 6){
					return
				}

				console.log(`game success : ${isGameSuccess}`)

				if(activeGuess === WORD){
					setGameSuccess(true)
					setGameOver(true)
					openModalAfterSomeTime(1500)
				}

				setGuessedWords([...guessedWords, activeGuess])
				setActiveGuess('')

				if([...guessedWords, activeGuess].length === 6){
					setGameOver(true)
					openModalAfterSomeTime(1500)
				}
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

			setActiveGuess(activeGuess => activeGuess + event.key.toUpperCase())
		}

		document.addEventListener('keydown', handleKey)
		return () => {
			console.log("event listener removed")
			return document.removeEventListener('keydown', handleKey)
		}
	}, [activeGuess])

	return(
		<div className="game_container">
			<Message text={WORD} visible={isGameOver && !isGameSuccess}
			/>
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
		</div>
	)
}

function Message({text, visible, activeGuess}){
	const style = {
		fontSize: '120%',
		fontWeight: '700',
		backgroundColor : '#212121',
		color : 'white',
		padding:'15px',
		borderRadius : '10px',
		opacity: visible ? 1 : 0
	}	
	return(
		<p style={style}>
			{text}
		</p>
	)
}

export default Game