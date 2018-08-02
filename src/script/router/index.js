import React from 'react'
import { Router, Route, Redirect } from 'react-router-dom'

import Project from '../containers/project'
import Visualization from '../containers/visualization'
import View from '../containers/view'
import Test from '../containers/test'

export default (init) => {
  return (
    <div>
      <Route
        path="/"
        exact
        render={() => <Redirect to={`/${init}`}/> }
      />
      <Route path="/Visualization" component={Visualization} />
      <Route path="/view" component={View} />
      <Route path="/test" component={Test} />
    </div>
  )
}
