
import { combineReducers } from 'redux'

import project from './project'
import view from './view'
import home from './home'

const rootReducer = combineReducers({
  project,
  view,
  home,
})

export default rootReducer