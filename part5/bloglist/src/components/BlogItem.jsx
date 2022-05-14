import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function BlogItem({ blog, handleDelete, handleLike }) {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginTop: 15,
  }

  return (
    <div style={blogStyle} className='blog-item'>
      <span className='blog-title'>{blog.title}</span>{' '}
      <span className='blog-author'>{blog.author}</span>
      <button onClick={() => setVisible(!visible)} className='button-view'>
        {visible ? 'hide' : 'view'}
      </button>
      <br />
      <div
        className='hidden-content'
        style={{ display: visible ? 'block' : 'none' }}>
        <span className='blog-url'>{blog.url}</span>
        <br />
        <span className='blog-likes'>{blog.likes}</span>
        <button onClick={() => handleLike(blog)} className='button-like'>
          like
        </button>
        <br />
        <button onClick={() => handleDelete(blog.id)} className='button-delete'>
          Delete
        </button>
      </div>
    </div>
  )
}
BlogItem.propTypes = {
  handleDelete: PropTypes.func,
  handleLike: PropTypes.func,
  blog: PropTypes.object.isRequired,
}
