import React, { useState } from "react"

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}
	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}
	const handleBad = () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<h1>Give feedback</h1>
			<p>
				<button onClick={handleGood}>good</button>
				<button onClick={handleNeutral}>neutral</button>
				<button onClick={handleBad}>bad</button>
			</p>
			<Statistics good={good} bad={bad} neutral={neutral} />
		</div>
	)
}

export default App

const Statistics = ({ good, bad, neutral }) => {
	if (good !== 0 || bad !== 0 || neutral !== 0) {
		return (
			<>
				<h2>Statistics</h2>
				<table>
					<tbody>
						<tr>
							<Statistic text='good' value={good} />
						</tr>
						<tr>
							<Statistic text='neutral' value={neutral} />
						</tr>
						<tr>
							<Statistic text='bad' value={bad} />
						</tr>
						<tr>
							<Statistic
								text='all'
								value={good + neutral + bad}
							/>
						</tr>
						<tr>
							<Statistic
								text='positive'
								value={good / (good + neutral + bad)}
							/>
						</tr>
					</tbody>
				</table>
			</>
		)
	} else {
		return (
			<>
				<h2>Statistics</h2>
				<p>No feedback given</p>
			</>
		)
	}
}

const Statistic = ({ text, value }) => {
	return (
		value !== 0 && (
			<>
				<td>{text} </td>
				<td>{value}</td>
			</>
		)
	)
}
