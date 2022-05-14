import React from "react"

export default function Form({
	handleSubmit,
	handleChangeName,
	handleChangeNumber,
}) {
	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a new</h2>
			<div>
				name: <input onChange={handleChangeName} />
			</div>
			<div>
				number: <input onChange={handleChangeNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}
