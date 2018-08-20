import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Icon, Tooltip } from 'antd'
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
    const { project } = this.props
    !get(project, 'path.hidden', false) && this.updatePath()
  }
  updatePath(root) {
    const { dispatch } = this.props
    return _Get('/api/dir', {
      root
    })
    .then(res => {
      dispatch(Action('project_path', res.data))
      console.log(this.props.project)
    })
  }
  getPathEl() {
    const { project } = this.props
    const rootSplitPath = get(project, 'info.nowPath', false).split('/')
    return (
      <div className="path-choose-el-box">
        {
          rootSplitPath.map((item, index) => {
            return item ? <div
              key={`path-item-${index}`}
              className="path-choose-el">
              {item}
            </div> : null
          })
        }
      </div>
    )
  }
  getFilesDetail(data, type, showSta) {
    const _type = data[0].file ? 'file' : 'dir'
    return (
      data.map((item, index) => {
        return showSta === true ? null : <div
        key={`${type}-dirs-${index}`}
        className={`${type}-detail-item detail-item`}>
          <Icon type={_type === 'file' ? 'file' : 'folder'} className="icon-ant detail-icon" />
          {item[_type] || item[_type]}
        </div>
      })
    )
  }
  getPathFiles() {
    const { project } = this.props
    const _hiddenFile = get(project, 'info.hidden', false)
    const hiddenFiles = get(project, 'path.hidden.files', false)
    const hiddenDirs = get(project, 'path.hidden.dirs', false)
    const visibleFiles = get(project, 'path.visible.files', false)
    const visibleDirs = get(project, 'path.visible.dirs', false)
    
    return hiddenFiles && (
      <div className="files-detail-box">
        {this.getFilesDetail(hiddenDirs, 'hidden', _hiddenFile)}
        {this.getFilesDetail(visibleDirs, 'visible')}
        {this.getFilesDetail(hiddenFiles, 'hidden', _hiddenFile)}
        {this.getFilesDetail(visibleFiles, 'visible')}
      </div>
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
        {this.getPathFiles()}
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
