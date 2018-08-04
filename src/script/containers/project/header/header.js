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
  getTabs() {
    return (<Tabs
      defaultActiveKey="1"
      type="line"
      onChange={(res) => {console.log(res)}}>
      <TabPane tab="Tab 1" key="1"></TabPane>
      <TabPane tab="Tab 2" key="2"></TabPane>
      <TabPane tab="Tab 3" key="3"></TabPane>
    </Tabs>)
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
