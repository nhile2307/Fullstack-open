const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
beforeEach(async () => {
  await Blog.deleteMany({})

  // let blogObject = new Blog(helper.blogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.blogs[1])
  // await blogObject.save()
  // blogObject = new Blog(helper.blogs[2])
  // await blogObject.save()
  // blogObject = new Blog(helper.blogs[3])
  // await blogObject.save()
  // blogObject = new Blog(helper.blogs[4])
  // await blogObject.save()
  // blogObject = new Blog(helper.blogs[5])
  // await blogObject.save()

  // const blogObject = helper.blogs.map((note) => new Blog(note))
  // const promiseArray = blogObject.map((blog) => blog.save())
  // await Promise.all(promiseArray)

  for (let blog of helper.blogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(6)
})

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('React patterns')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.blogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Author',
    url: 'http',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map((r) => r.title)
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  expect(contents).toContain('async/await simplifies making async calls')
})
test('blog without title or url is not added', async () => {
  const newBlogWithoutTitle = {
    author: 'Hmm',
    url: 'http',
    likes: 0,
  }
  const newBlogWithoutUrl = {
    title: 'Title',
    author: 'Hmm',
    likes: 0,
  }

  await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)
  await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})
test('if like is missing, it will be 0 by default', async () => {
  const newBlogWithoutLikes = {
    title: 'Tettttt',
    author: 'Hmm',
    url: 'http',
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const like = blogsAtEnd[blogsAtEnd.length - 1].likes
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  expect(like).toBe(0)
})
test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('test that verifies that the unique identifier property of the blog posts is named id,', async () => {
  const blogs = await Blog.find({})
  expect(blogs[0]._id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
