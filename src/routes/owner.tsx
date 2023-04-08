import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import Home from 'pages/owner/Home'
import CreatPlace from 'pages/owner/CreatPlace'
import RenewRoom from 'pages/owner/RenewRoom'
import PreviewRoom from 'components/owner/PreviewRoom'
import Signup from 'pages/owner/Signup'
import ViewRoom from 'components/owner/ViewRoom'
import EditRoom from 'pages/owner/EditRoom'
import Login from '../pages/shared/Login'
import NotFound from '../pages/static-page/NotFound'

export default function OwnerRouter() {
  const router = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`/owner`} component={Home} />
      <Route path={`/owner/login`} component={Login} />
      <Route path={`/owner/signup`} component={Signup} />
      <Route path={`/owner/create-room`} component={CreatPlace} />
      <Route path={`/owner/rooms/:room_id/preview`} component={PreviewRoom} />
      <Route path={`/owner/rooms/:room_id/rent_preview`} component={PreviewRoom} />
      <Route path={`/owner/rooms/:room_id/live_room`} component={PreviewRoom} />
      <Route path={`/owner/rooms/:room_id/pending`} component={PreviewRoom} />
      <Route path={`/owner/rooms/:room_id/view`} component={ViewRoom} />
      <Route path={`/owner/rooms/:room_id/renew`} component={RenewRoom} />
      <Route path={`/owner/rooms/:room_id/edit`} component={EditRoom} />
      <Route component={NotFound} />
    </Switch>
  )
}
