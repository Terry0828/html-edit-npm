import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import './index.less'

import { Button } from 'antd'
class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'view'
    }
  }


  goUrl() {
    const { history } = this.props
    history.push('/')
  }
  addNum() {
    const { dispatch, home } = this.props
    dispatch({
      type: 'ADD',
      list: home.list + 1
    })
  }

  btnSty() {
    return {
      width: '100px',
      height: '40px',
      border: '1px solid rgba(0,0,0,0.1)',
      background: 'rgba(0,0,0,0.1)',
      borderRadius: '3px',
      cursor: 'pointer',
      textAlign: 'center',
      lineHeight: '40px',
      userSelect: 'none'
    }
  }

  render () {
    return (
      <div>
      <Button>Default</Button>
        <p className="view">list:{this.props.home.list}</p>
        <p>{this.props.examinationId}</p>
        <p style={{...this.btnSty()}} onClick={() => { this.goUrl() }}>to home</p>
        <p style={{...this.btnSty()}} onClick={ this.addNum.bind(this) }>Add Num</p>
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
  examinationId: 1
}))(View)
