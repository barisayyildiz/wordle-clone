import React, { useState } from 'react'
import './style.scss'

function Cell(props) {
	const { value, finished, index, color, continues, notFound, success } = props

	const text = value !== undefined ? value : ''

	console.log(
		`finished : ${finished}
		continues : ${continues}
		notFound : ${notFound}
		success : ${success}
		`
	)

	const renderClasses = () => {
		let classes = 'cell'
		return classes
	}

	const animationList = {
		'finished':{
			animationName : '+',
			animationDuration : '500ms'
		}
	}

	const generateAnimation = () => {
		if(finished){
			return `Rotate 600ms ease-out ${index * 100}ms`
		}else if(continues){
			return `PopIn 200ms ease-in`
		}else if(notFound){
			return `Shake 600ms ease-in`
		}else if(success){
			return `Bounce 600ms ease-in ${index * 100}ms`
		}
	}

	const style = {
		backgroundColor : color,
		color : finished ? 'white' : 'black',
		border:finished && `1px solid ${color}`,
		// ...generateAnimation()
		animation : generateAnimation()
	}

	return (
		<div 
			style={style}
			className={renderClasses()}
		>
			{text}
		</div>
	)
}

export default Cell

