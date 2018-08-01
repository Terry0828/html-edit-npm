import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import getStore from './script/store'
import CreateRouter from './script/router'

import './assets/css/dragula.css'
import './assets/css/index.scss'
// antd
// import 'antd/dist/antd.css'
export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="wrap">
        <Router>
          {CreateRouter()}
        </Router>
      </div>
    )
  }
}

// 创建store
const store = getStore()
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)