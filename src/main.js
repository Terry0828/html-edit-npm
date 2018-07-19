import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import getStore from './store'
import CreateRouter from './router'

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
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/view">About</Link>
              </li>
            </ul>
            <hr />
            {CreateRouter()}
          </div>
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