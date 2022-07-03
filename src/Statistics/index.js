import React from 'react'
import './style.scss'

function Statistics({
	played,
	winPer,
	curStreak,
	maxStreak
}) {
	return (
		<div id="statistics"
			style={{
				display:'flex',
				justifyContent:'space-around',
				alignItems:'center',
				fontSize:'24px',
				margin:'30px 0px'
			}}
		>
			<div className="statistics-container">
				<div className="statistic-number">{played}</div>
				<div className="statistic-label">Played</div>
			</div>
			<div className="statistics-container">
				<div className="statistic-number">{winPer}</div>
				<div className="statistic-label">Win %</div>
			</div>
			<div className="statistics-container">
				<div className="statistic-number">{curStreak}</div>
				<div className="statistic-label">Current Streak</div>
			</div>
			<div className="statistics-container">
				<div className="statistic-number">{maxStreak}</div>
				<div className="statistic-label">Max Streak</div>
			</div>
		</div>
	)
}

export default Statistics