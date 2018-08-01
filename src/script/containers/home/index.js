import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import View from './view/view'
import Tool from './tool/tool'
import Browse from './browse/browse'

import { Button } from 'antd'

import './index.scss'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="home-wrap">
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
}))(Home)
