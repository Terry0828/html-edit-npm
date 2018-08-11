import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Icon, Tooltip } from 'antd'
// import Icon from '../common/icon'
import { _Get } from '../../utils/request'
import Action from '../../actions/global'

import './index.scss'
class PathView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    this.updatePath()
  }
  updatePath(root) {
    const { dispatch } = this.props
    return _Get('/api/dir', {
      root
    })
    .then(res => {
      dispatch(Action('project_path', res.data))
    })
  }
  getPathEl() {
    const { project } = this.props
    console.log('project', project)
    return (
      <div>{get(project)}</div>
    )
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
            {this.getPathEl()}
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
  project: state.project,
}))(PathView)
