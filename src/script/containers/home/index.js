import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'antd'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
        home
      </div>
    )
  }
} 

export default connect(state => ({
  home: state.home,
  examinationId: 1
}))(Home)
