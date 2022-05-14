import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Filter from './components/Filter'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import * as blogsService from './service/blogs'
import * as loginService from './service/login'

const App = () => {
  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [results, setResults] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    blogsService.getAll().then((blogs) => {
      setBlogs(sortingBlogs(blogs))
      setResults(sortingBlogs(blogs))
    })
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const sortingBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const handleLogout = () => {
    window.localStorage.clear('loggedNoteappUser')
    document.location.href = '/'
  }

  const handleLike = async (blog) => {
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    try {
      await blogsService.update(blog.id, newBlog)
      setUpdate(Math.floor(Math.random() * 1000))
    } catch {
      setErrorMessage('This blog does not exist')
      setError(true)
    }
  }

  const handleBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    if (results.find((blog) => blog.title === blogObject.title)) {
      if (
        window.confirm(
          `${blogObject.title} is already added to blog list. Do you want to change url and author`,
        )
      ) {
        results.forEach(async (blog, index) => {
          if (blog.title === blogObject.title) {
            const newBlog = blog
            newBlog.author = blogObject.author
            newBlog.url = blogObject.url
            newBlog.likes = blogObject.likes ? blogObject.likes : 0
            try {
              await blogsService.update(blog.id, newBlog)
              setUpdate(Math.floor(Math.random() * 1000))
            } catch {
              setErrorMessage('This blog does not exist')
              setError(true)
            }
          }
        })
      }
    } else {
      blogsService
        .create(blogObject)
        .then((updatedBlogs) => {
          setBlogs(blogs.concat(updatedBlogs))
          setResults(results.concat(updatedBlogs))
          setErrorMessage('Successful')
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          console.log(error.response.data.error)
          setError(true)
        })
    }
    setTimeout(() => {
      setErrorMessage(null)
      setError(false)
    }, 5000)
  }
  const blogForm = () => {
    return (
      <>
        <Filter handleFilter={handleFilter} />
        <p>{user.name} logged-in</p>{' '}
        <button onClick={handleLogout}>Log out</button>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleBlog={handleBlog} />
        </Togglable>
        <Blogs
          results={results}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      </>
    )
  }

  const handleFilter = (event) => {
    const searchString = event.target.value.toLowerCase().split(' ')
    const filterBlogs = blogs.filter((blog) => {
      let containsAtLeastOneWord = false
      searchString.forEach((word) => {
        if (blog.title.toLowerCase().includes(word))
          containsAtLeastOneWord = true
      })
      if (containsAtLeastOneWord) {
        return blog
      } else {
        return null
      }
    })
    setResults(filterBlogs)
  }

  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete this blog?')) {
      const updatedBlogs = results.filter((result) => result.id !== id)
      setBlogs(updatedBlogs)
      setResults(updatedBlogs)
      blogsService.remove(id)
    }
  }

  return (
    <div>
      <h2>Blog list</h2>
      {errorMessage ? (
        <Notification message={errorMessage} error={error} />
      ) : null}
      {user ? blogForm() : loginForm()}
    </div>
  )
}

export default App
