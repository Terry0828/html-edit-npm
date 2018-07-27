
import { combineReducers } from 'redux'

import home from './home'
import view from './view'

const rootReducer = combineReducers({
  home,
  view
})

export default rootReducer