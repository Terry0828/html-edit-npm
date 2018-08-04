import React from 'react'
import { Router, Route, Redirect, IndexRoute } from 'react-router-dom'

import Project from '../containers/project'
import ProjectInit from '../containers/project_init'

import Visualization from '../containers/visualization'
import View from '../containers/view'
import Test from '../containers/test'

export default (init) => {
  return (
    <div className="router-container">
      <Route
        path="/"
        exact
        render={() => <Redirect to={`/project/${init}`}/> }
      />

      {/* Project */}
      <Route path="/project" component={Project} />
      <Route path="/project/init" component={ProjectInit} />

      <Route path="/Visualization" component={Visualization} />
      <Route path="/view" component={View} />
      <Route path="/test" component={Test} />
    </div>
  )
}
