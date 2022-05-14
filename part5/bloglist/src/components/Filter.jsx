import React from 'react'
import PropTypes from 'prop-types'

export default function Filter({ handleFilter }) {
  return (
    <p>
      filter shown with <input type='text' onChange={handleFilter} />
    </p>
  )
}
Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
}
