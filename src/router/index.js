import React from 'react'
import { Router, Route } from 'react-router-dom'

import View from '../components/view'
import Test from '../components/test'

export default () => {
  return (
    <div>
      <Route path="/" exact component={View} />
      <Route path="/view" component={Test} />
    </div>
  )
}
