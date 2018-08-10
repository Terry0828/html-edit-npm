import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Tooltip } from 'antd'
// import Icon from '../common/icon'

import './index.scss'
class PathView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { style } = this.props
    return (
      <div style={style} className="path-view-box">
        <div className="nav">
          <Tooltip placement="top" title={'上一级目录'}>
            <Icon type="up" className="icon-ant path-icon" />
          </Tooltip>
          <div className="path-detail-box">
            <Tooltip placement="top" title={'根目录'}>
              <Icon type="folder" className="icon-ant path-icon" />
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
} 

PathView.propTypes = {
  style: PropTypes.object
}
export default connect(state => ({
  home: state.home,
}))(PathView)
