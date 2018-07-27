import React from 'react'
import { Router, Route } from 'react-router-dom'

import Home from '../containers/home'
import View from '../containers/view'
import Test from '../containers/test'

export default () => {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/view" component={View} />
      <Route path="/test" component={Test} />
    </div>
  )
}
