import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'antd'

import '../index.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className="header-container">
        <h3 className="">项目管理器</h3>
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
}))(Header)
