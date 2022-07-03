import React from 'react'
import './style.scss'

function Cell(props) {
	const { value, style, finished } = props

	const text = value !== undefined ? value : ''

	return (
		<div style={props.style} className='cell'>
			{text}
		</div>
	)
}

export default Cell