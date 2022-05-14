import React from 'react'

import PropTypes from 'prop-types'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div id='notification' className={`message ${error ? 'error' : ''}`}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}
export default Notification
