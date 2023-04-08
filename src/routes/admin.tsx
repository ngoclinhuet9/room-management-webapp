import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import Home from 'pages/admin/Home'
import PreviewRoom from 'pages/admin/PreviewRoom'
import NotFound from '../pages/static-page/NotFound'
import Login from '../pages/shared/Login'

export default function AdminRouter() {
  const router = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`/admin`} component={Home} />
      <Route path={`/admin/login`} component={Login} />
      <Route path={`/admin/rooms/:room_id/preview`} component={PreviewRoom} />
      <Route component={NotFound} />
    </Switch>
  )
}
