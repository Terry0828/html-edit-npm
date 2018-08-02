import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import View from './view/view'
import Tool from './tool/tool'
import Browse from './browse/browse'

import './index.scss'
class Visualization extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="visualization-wrap">
        <Tool />
        <View />
        <Browse />
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
  examinationId: 1
}))(Visualization)
