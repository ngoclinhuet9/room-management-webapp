import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'

import Signup from 'pages/renter/Signup'
import Home from 'pages/renter/Home'
import NotFound from 'pages/static-page/NotFound'
import SearchResult from 'pages/renter/City'
import RoomDetail from 'pages/renter/Detail'
import Account from 'pages/renter/Account'
import Bookmark from 'pages/renter/Bookmark'
import Login from '../pages/shared/Login';
import path from 'path'

export default function RenterRouter() {
  const router = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route exact path={`/renter`} component={Home} />
      <Route exact path={`/renter/login`} component={Login} />
      <Route exact path={`/renter/rooms/:room_id`} component={RoomDetail} />
      <Route exact path={`/renter/search`} component={SearchResult} />
      <Route exact path={`/renter/signup`} component={Signup} />
      <Route exact path={`/renter/account`} component={Account} />
      <Route exact path={`/renter/bookmarks`} component={Bookmark} />
      <Route component={NotFound} />
    </Switch>
  )
}
