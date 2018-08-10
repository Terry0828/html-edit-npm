import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import Step from './step/step'
import PathView from '../../components/path_view'

import './index.scss'
class ProjectInit extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="project-init-wrap project-container">
        <Step />
        <PathView />
      </div>
    )
  }
} 

ProjectInit.propTypes = {
}
export default connect(state => ({
  home: state.home,
}))(ProjectInit)
