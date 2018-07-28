import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Tool extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="tool-container">
        <div className=""></div>
      </div>
    )
  }
}

export default connect(state => ({
  view: state.view,
}))(Tool)
