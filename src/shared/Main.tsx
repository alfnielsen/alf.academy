import React from "react"
import { Route, Switch } from "react-router-dom"
import routes from "../config/routes"

const Main = () => (
  <main>
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={true}
          component={route.component}
        />
      ))}
    </Switch>
  </main>
)
export default Main
