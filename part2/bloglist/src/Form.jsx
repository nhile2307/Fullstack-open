import React from 'react'

export default function Form({
  handleSubmit,
  handleChangeTitle,
  handleChangeAuthor,
  handleChangeUrl,
  handleChangeLike,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new blog</h2>
      <div>
        Title: <input onChange={handleChangeTitle} />
      </div>
      <div>
        Author: <input onChange={handleChangeAuthor} />
      </div>
      <div>
        Link: <input onChange={handleChangeUrl} />
      </div>
      <div>
        Likes: <input onChange={handleChangeLike} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}
