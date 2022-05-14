import React from "react"

export default function Persons({ results, handleDelete }) {
	return results.map((person) => (
		<p key={person.id}>
			{person.name} {person.number}{" "}
			<button onClick={() => handleDelete(person.id)}>Delete</button>
		</p>
	))
}
