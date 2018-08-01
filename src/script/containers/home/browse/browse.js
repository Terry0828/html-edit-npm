import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Drawer } from 'antd'

class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }
  onClose() {
    this.setState({ visible: false })
  }
  render() {
    return (
      <div className="browse-container">
      </div>
      
    )
  }
}

export default connect(state => ({
  view: state.view,
}))(Browse)
