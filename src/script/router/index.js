import React from 'react'
import { Router, Route } from 'react-router-dom'

import Visualization from '../containers/visualization'
import View from '../containers/view'
import Test from '../containers/test'

export default () => {
  return (
    <div>
      <Route path="/" exact component={Visualization} />
      <Route path="/view" component={View} />
      <Route path="/test" component={Test} />
    </div>
  )
}
