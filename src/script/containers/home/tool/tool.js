import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Tool extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="tool-detail"></div>
    )
  }
}

export default connect(state => ({
  home: state.home,
}))(Tool)
