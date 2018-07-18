
import React, { Component } from 'react' // React
import { connect } from 'react-redux' // connect方法用于创建控制器组件，即数据和行为交由redux管理
import PropTypes from 'prop-types'

export default (state, action) => {
  switch (action.type) {
    case 'add':
      console.log('add')
      return Object.assign({}, state, {
        addd: action.addd,
      })
    default:
      return state
  }
}


