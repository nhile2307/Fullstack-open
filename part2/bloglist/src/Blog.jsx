import React from 'react'

export default function Blogs({ results, handleDelete }) {
  return results.map((blog) => (
    <p key={blog.id}>
      <hr />
      {blog.title} <br /> {blog.author}
      <br />
      {blog.url}
      <br />
      {blog.likes}
      <br />
      <button onClick={() => handleDelete(blog.id)}>Delete</button>
    </p>
  ))
}
