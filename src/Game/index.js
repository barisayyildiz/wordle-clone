import React, { useState, useEffect } from 'react'
import "./style.scss"

import { ToastContainer, Flip, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { checkWord } from "./util"

import Row from "../Row"

function Game(props) {
	const [isGameOver, setGameOver] = useState(false)
	const [isGameSuccess, setGameSuccess] = useState(false)
	const [guessedWords, setGuessedWords] = useState([])
	const [activeGuess, setActiveGuess] = useState('')
	const [isNotEnough, setNotEnough] = useState(false)

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
		isNotEnough,
		setNotEnough,
		WORD
	}

	const openModalAfterSomeTime = (ms) => {
		setTimeout(() => {
			setModalStatus(true)
		}, ms)
	}

	const generateToast = (text, duration) => {
		return toast.dark(text, {
			position: "top-center",
			autoClose: duration,
			hideProgressBar: true,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			closeButton: false,
			transition: Flip
			});
	}

	useEffect(() => {
		console.log("game oluştu")

		const handleKey = (event) => {

			// oyun çoktan bitmişse
			if(isGameSuccess || isGameOver){
				return
			}

			// kelime kontrol edilmeli
			if(event.key === 'Enter'){
				if(activeGuess.length < 5){
					generateToast('Yetersiz harf', 1000)
					return
				}
				if(guessedWords.length == 6){
					return
				}
				if(activeGuess === WORD){
					generateToast('Tebrikler', 2000)
					setGameSuccess(true)
					setGameOver(true)
					openModalAfterSomeTime(4000)
				}
				setGuessedWords([...guessedWords, activeGuess])
				setActiveGuess('')

				if([...guessedWords, activeGuess].length === 6){
					generateToast(WORD, false)
					setGameOver(true)
					openModalAfterSomeTime(4000)
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

			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				style={{
					margin:'100px 0px',
					fontSize: '120%',
					width: '200px'
				}}
			/>
			
			{
				Array.from(Array(6).keys()).map(key => {
					return <Row
						key={key}
						index={key}
						value={guessedWords[key] !== undefined ? guessedWords[key] : (key == guessedWords.length ? activeGuess : '')}
						notFound={key == guessedWords.length && isNotEnough}
						{...propsToBeSent}
					/>
				})
			}


		</div>
	)
}

export default Game