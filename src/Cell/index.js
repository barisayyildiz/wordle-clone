import React, { useState } from 'react'
import './style.scss'

function Cell(props) {
	const { value, finished, index, color, continues, success } = props

	const generateAnimation = () => {
		if(finished){
			return `Rotate 600ms ease-out ${index * 200}ms`
		}else if(continues){
			return `PopIn 200ms ease-in`
		}
	}

	const style = {
		animation : generateAnimation()
	}

	const handleAnimationEnd = (event) => {
		console.log(event.target.classList)
		if(event.animationName === 'Rotate'){
			event.target.style.backgroundColor = color
			event.target.style.color = 'white'
			event.target.style.border = `1px solid ${color}`

			if(success){
				event.target.style.animation = `Bounce 600ms ease-in ${(index+10) * 100}ms 2`
				return
			}
		}
	}

	const text = value !== undefined ? value : ''

	return (
		<div 
			onAnimationEnd={handleAnimationEnd}
			style={style}
			className="cell"
			index={index}
		>
			{text}
		</div>
	)
}

export default Cell

