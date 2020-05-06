import React from "react"

import { IRouteItem, registerRoutes } from "./routesBase"
import Home from "../pages/Home"

const routes: IRouteItem[] = []

registerRoutes(routes, [
  {
    path: "/",
    name: "Home",
    component: () => <Home />,
    exact: true,
  },
  {
    path: "/user",
    childOf: "/",
    name: "User",
    component: () => <div>User</div>,
  },
  {
    path: "/user/alf",
    childOf: "/user",
    name: "Alf",
    component: () => <div>User with Alf</div>,
  },
])

export default routes
