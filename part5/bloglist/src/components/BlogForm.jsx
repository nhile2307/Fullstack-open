import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function BlogForm({ handleBlog }) {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleChangeLike = (event) => {
    setNewLikes(event.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlogs = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }
    handleBlog(newBlogs)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new blog</h2>
      <div>
        Title:{' '}
        <input value={newTitle} id='title' onChange={handleChangeTitle} />
      </div>
      <div>
        Author:{' '}
        <input
          className='author'
          id='author'
          value={newAuthor}
          onChange={handleChangeAuthor}
        />
      </div>
      <div>
        Link: <input value={newUrl} id='link' onChange={handleChangeUrl} />
      </div>
      <div>
        Likes: <input value={newLikes} id='likes' onChange={handleChangeLike} />
      </div>
      <div>
        <button id='submit-form' type='submit'>
          Add
        </button>
      </div>
    </form>
  )
}
BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired,
}
