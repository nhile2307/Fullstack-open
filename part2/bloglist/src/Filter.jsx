import React from 'react'

export default function Filter({ handleFilter }) {
  return (
    <p>
      filter shown with <input type='text' onChange={handleFilter} />
    </p>
  )
}
