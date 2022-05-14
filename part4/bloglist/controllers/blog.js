const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const userContent = {
  username: 1,
  name: 1,
}
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', userContent)
  response.json(blogs)
})

blogRouter.get('/info', (request, response) => {
  const time = new Date()
  Blog.find({}).then((blogs) => {
    const length = blogs.length
    blogs.map((blog) => blog.toJSON())
    response.send(
      `<div><p>Blog list has info for ${length} blogs</p><p>${time}</p>`,
    )
  })
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', userContent)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  }
  const blog = await Blog.findByIdAndUpdate(id, newBlog)
  response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  // await Blog.findByIdAndRemove(id)
  // response.status(204).end()

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // const userId = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const { body } = request
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title) {
    return response.status(400).json({
      error: 'Title is required',
    })
  }
  if (!body.author) {
    return response.status(400).json({
      error: 'Author is required',
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'Link is required',
    })
  }
  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

module.exports = blogRouter
