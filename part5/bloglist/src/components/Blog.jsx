import React from 'react'
import PropTypes from 'prop-types'

import BlogItem from './BlogItem'

export default function Blogs({ results, handleDelete, handleLike }) {
  return results.map((blog) => (
    <BlogItem
      key={blog.id}
      blog={blog}
      handleDelete={handleDelete}
      handleLike={handleLike}
    />
  ))
}

BlogItem.propTypes = {
  results: PropTypes.array,
  handleDelete: PropTypes.func,
  handleLike: PropTypes.func,
}
