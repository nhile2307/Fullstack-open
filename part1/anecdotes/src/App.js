import React, { useState } from "react"

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
	]

	const [selected, setSelected] = useState(0)
	const generateAnecdote = () => {
		const num = Math.floor(Math.random() * 5)
		setSelected(num)
	}

	const [points, setPoints] = useState([1, 4, 6, 3, 3, 4])

	const voteHandler = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}
	const mostVotes = points.indexOf(Math.max.apply(null, points))

	return (
		<div>
			<h2>Anesdote of the day</h2>
			<p>{anecdotes[selected]}</p>
			<p>has {points[selected]} votes</p>
			<p>
				<button onClick={voteHandler}>vote</button>
				<button onClick={generateAnecdote}>next anecdote</button>
			</p>
			<h2>Anesdote with most votes</h2>
			<p>{anecdotes[mostVotes]}</p>
			<p>has {points[mostVotes]} votes</p>
		</div>
	)
}

export default App
