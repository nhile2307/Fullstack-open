import React from "react"

const App = () => {
	// const-definitions
	const course = "Half Stack application development"
	const parts = [
		{
			name: "Fundamentals of React",
			exercises: 10,
		},
		{
			name: "Using props to pass data",
			exercises: 7,
		},
		{
			name: "State of a component",
			exercises: 14,
		},
	]
	const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
	return (
		<div>
			<Header course={course} />
			<Content
				parts={[parts[0].name, parts[1].name, parts[2].name]}
				exercises={[
					parts[0].exercises,
					parts[1].exercises,
					parts[2].exercises,
				]}
			/>
			<Total total={total} />
		</div>
	)
}

const Header = ({ course }) => {
	return <h1>{course}</h1>
}
const Content = ({ parts, exercises }) => (
	<div>
		<Part part={parts[0]} exercise={exercises[0]} />
		<Part part={parts[1]} exercise={exercises[1]} />
		<Part part={parts[2]} exercise={exercises[2]} />
	</div>
)

const Part = ({ part, exercise }) => {
	return (
		<p>
			{part} {exercise}
		</p>
	)
}
const Total = ({ total }) => {
	return <p>Number of exercises {total}</p>
}

export default App
