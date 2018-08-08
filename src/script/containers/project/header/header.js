import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Tabs } from 'antd'

import '../index.scss'

const TabPane = Tabs.TabPane
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  goUrl(path) {
    const { history } = this.props
    history.push({
      pathname: `/project/${path}`
    })
  }
  getTabs() {
    return (<Tabs
      defaultActiveKey="1"
      type="line"
      onChange={(res) => {this.goUrl(res)}}>
      <TabPane tab="信息" key="info"></TabPane>
      <TabPane tab="Init" key="other"></TabPane>
      <TabPane tab="配置" key="init"></TabPane>
    </Tabs>)
  }
  componentDidMount() {
    const { history } = this.props
    console.log('history', history)
    // history.push('/')
  }
  render() {
    return (
      <div className="header-container">
        <h3 className="title-large title">项目管理</h3>
        <div className="tabs-box">{this.getTabs()}</div>
      </div>
    )
  }
}

export default connect(state => ({
  home: state.home,
}))(Header)
