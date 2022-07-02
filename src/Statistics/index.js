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
			<div class="statistics-container">
				<div class="statistic-number">{played}</div>
				<div class="statistic-label">Played</div>
			</div>
			<div class="statistics-container">
				<div class="statistic-number">{winPer}</div>
				<div class="statistic-label">Win %</div>
			</div>
			<div class="statistics-container">
				<div class="statistic-number">{curStreak}</div>
				<div class="statistic-label">Current Streak</div>
			</div>
			<div class="statistics-container">
				<div class="statistic-number">{maxStreak}</div>
				<div class="statistic-label">Max Streak</div>
			</div>
		</div>
	)
}

export default Statistics