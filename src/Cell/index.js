import React, { useState } from 'react'
import './style.scss'

function Cell(props) {
	const { value, finished, index, color, continues, notFound, success } = props
	
	const generateAnimation = () => {
		if(finished){
			return `Rotate 600ms ease-out ${index * 200}ms`
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
		animation : generateAnimation()
	}

	const text = value !== undefined ? value : ''

	return (
		<div 
			style={style}
			className='cell'
		>
			{text}
		</div>
	)
}

export default Cell

