const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const blogContent = {
	title: 1,
	url: 1,
	likes: 1,
}

usersRouter.post('/', async (request, response) => {
	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.json(savedUser)
})
usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', blogContent)
	response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const user = await User.findById(id).populate('blogs', blogContent)
	if (user) {
		response.json(user.toJSON())
	} else {
		response.status(404).end()
	}
})

module.exports = usersRouter
