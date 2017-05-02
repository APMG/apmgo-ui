import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Greeting = props => (
  <div>Hello {props.name}!</div>
)

Greeting.defaultProps = {
  name: 'Listener'
}

Greeting.propTypes = {
  name: PropTypes.string
}

export default Greeting
