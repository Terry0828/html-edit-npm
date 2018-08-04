import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Step extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="step-container">
        <p>init-step</p>
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
}))(Step)
