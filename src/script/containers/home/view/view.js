import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class View extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    console.log(this.props.view)
    console.log(this.props.home)
  }
  render() {
    const { view } = this.props
    return (
      <div
      style={{
        width: `${view.wid}px`,
        height: `${view.hei}px`,
      }}
      className="view-detail"></div>
    )
  }
}

export default connect(state => ({
  view: state.view,
  home: state.home
}))(View)
