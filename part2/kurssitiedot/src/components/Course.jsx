import React from "react"

const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

export default Course

const Header = ({ name }) => {
	return <h1>{name}</h1>
}
const Content = ({ parts }) =>
	parts.map((part) => (
		<Part
			key={`part_${part.id}`}
			name={part.name}
			exercise={part.exercises}
		/>
	))

const Part = ({ name, exercises }) => {
	return (
		<p>
			{name} {exercises}
		</p>
	)
}
const Total = ({ parts }) => {
	const total = parts.reduce((sum, part) => {
		return sum + part.exercises
	}, 0)
	return (
		<p>
			<b>total of {total} exercises</b>
		</p>
	)
}
