import React from 'react'
import './style.scss'

function Cell(props) {
	const { value } = props
	const text = value !== undefined ? value : ''
	return (
		<div className='cell'>
			{text}
		</div>
	)
}

export default Cell