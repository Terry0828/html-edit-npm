import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'antd'

import Header from './header/header'

import './index.scss'
class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { history } = this.props
    return (
      <div className="project-wrap">
        <Header history={history}/>
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
}))(Project)
