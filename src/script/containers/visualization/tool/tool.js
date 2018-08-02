import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dragula from 'dragula'

class Tool extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    dragula([
      this.getHtmlElement('.tool-container'),
      this.getHtmlElement('.view-detail')
    ], {
      isContainer: function (el) {
        return false; // only elements in drake.containers will be taken into account
      },
      moves: function (el, source, handle, sibling) {
        return true; // elements are always draggable by default
      },
      accepts: function (el, target, source, sibling) {
        return true; // elements can be dropped in any of the `containers` by default
      },
      invalid: function (el, handle) {
        return false; // don't prevent any drags from initiating by default
      },
      direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
      copy: true,                       // elements are moved by default, not copied
      copySortSource: true,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
      mirrorContainer: document.body,    // set the element that gets mirror elements appended
      ignoreInputTextSelection: true     // allows users to select input text, see details below
    })
  }
  getHtmlElement(query) {
    return document.querySelector(query)
  }
  render() {
    return (
      <div>
      <div className="tool-container">
        <div className="">dfdfdf</div>
        <div className="">0000</div>
      </div>
      
      </div>
      
    )
  }
}

export default connect(state => ({
  view: state.view,
}))(Tool)
