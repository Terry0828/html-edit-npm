import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'   // 中间件，有了这个就可以支持异步action
import RootReducer from './reducers' // 所有的reducer

import 'babel-polyfill'

import CreateRouter from './router/index'

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
const store = createStore(RootReducer, applyMiddleware(ReduxThunk))

store.dispatch({
  type: 'add',
  str: 'csss',
  addd: '00000'
})
console.log(store.getState('add'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)