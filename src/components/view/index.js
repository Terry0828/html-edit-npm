import React, { Component } from 'react'

export default class View extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'hello wjw !'
    }
  }

  render() {
    return <p>{this.state.data}</p>
  }
}