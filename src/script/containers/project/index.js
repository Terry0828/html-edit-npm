import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'antd'

import './index.scss'
class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="project-wrap">
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
}))(Project)
