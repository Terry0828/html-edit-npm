import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class Icon extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const { className, style, icon } = this.props
    return (
      <i
        className={`iconfont icon-${icon} icon ${className}`}
        style={style}
      ></i>
    )
  }
}

Icon.defaultProps = {
  className: '',
  style: {}
}
Icon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
}

