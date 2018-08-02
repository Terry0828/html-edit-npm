import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Menu,
  Dropdown,
  Button } from 'antd'

import { screenArr, scaleArr } from '../../../common/constant'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.view,
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  changeNowDevice(data) {
    this.setState({
      ...data
    })
  }
  getDeviceList() {
    return (<Menu>
      {
        screenArr.map((item, index) => {
          return <Menu.Item key={'device-' + index}>
            <p
            className="noSelect"
            onClick={ () => this.setState({ ...item })}>
              {item.type}
            </p>
          </Menu.Item>
        })
      }
    </Menu>)
  }
  getScaleList() {
    return (<Menu>
      {
        scaleArr.map((item, index) => {
          return <Menu.Item key={'scale-' + index}>
            <p
            className="noSelect"
            onClick={ () => this.setState({ scale: item })}>
              {item}
            </p>
          </Menu.Item>
        })
      }
    </Menu>)
  }
  render() {
    const { wid, hei, type, scale } = this.state
    return (
      <div className="view-container"
      style={{
        transform: `translate(-50%, 0) scale(${Number(scale.replace('%', '')) / 100})`
      }}>
        <div className="top-box noSelect">
          <span className="size-input">{wid}</span>
          <span className="size-symbol">*</span>
          <span className="size-input">{hei}</span>
          <Dropdown
          trigger={['click']}
          overlay={this.getDeviceList()}
          placement="bottomLeft">
            <span className="device-show">&nbsp;-&nbsp;{type}</span>
          </Dropdown>
          <Dropdown
          trigger={['click']}
          overlay={this.getScaleList()}
          placement="bottomLeft">
            <span className="device-show">&nbsp;-&nbsp;{scale}</span>
          </Dropdown>
        </div>
        <div
        style={{
          width: `${wid}px`,
          height: `${hei}px`,
        }}
        className="view-detail">
        </div>
        <div className="right-box"></div>
      </div>
    )
  }
}

export default connect(state => ({
  view: state.view,
  home: state.home
}))(View)
