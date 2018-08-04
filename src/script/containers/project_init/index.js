import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import Step from './step/step'

import './index.scss'
class Init extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="project-init-wrap project-container">
        <Step />
      </div>
    )
  }
} 

Init.propTypes = {
}
export default connect(state => ({
  home: state.home,
}))(Init)
