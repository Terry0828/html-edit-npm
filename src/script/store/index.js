import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import Reducer from '../reducer'

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware)
)(createStore)

export default () => createStoreWithMiddleware(Reducer)