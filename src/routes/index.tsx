import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from 'pages/renter/Home'
import NotFound from 'pages/static-page/NotFound'
import SearchResult from 'pages/renter/City'
import RoomDetail from 'pages/renter/Detail'
import Account from 'pages/renter/Account'
import Bookmark from 'pages/renter/Bookmark'
import RenterLogin from 'pages/renter/Login';
import History from 'pages/renter/History'
import RentingRoom from 'pages/renter/RentingRoom'

import OwnerHome from 'pages/owner/Home'
import CreatPlace from 'pages/owner/CreatPlace'
import RenewRoom from 'pages/owner/RenewRoom'
import OwnerPreviewRoom from 'components/owner/PreviewRoom'
import OwnerSignup from 'pages/owner/Signup'
import ViewRoom from 'components/owner/ViewRoom'
import EditRoom from 'pages/owner/EditRoom'

import AdminHome from 'pages/admin/Home'
import AdminPreviewRoom from 'pages/admin/PreviewRoom'
import Dashboard from 'pages/admin/Dashboard'

import ReturnVP from 'components/vnpay/ReturnVNPAY'
import ReturnVNPAY from 'pages/renter/ReturnVNPAY'

function App() {
  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route exact path={`/renter`} component={Home} />
      <Route path={`/login`} component={RenterLogin} />
      <Route path={`/renter/rooms/:room_id`} component={RoomDetail} />
      <Route path={`/renter/search`} component={SearchResult} />
      <Route path={`/renter/account`} component={Account} />
      <Route path={`/renter/bookmarks`} component={Bookmark} />
      <Route path={`/renter/histories`} component={History} />
      <Route path={`/renter/renting`} component={RentingRoom} />
      <Route path={`/renter/payment_VN_pay`} component={ReturnVP} />

      <Route exact path={`/owner`} component={OwnerHome} />
      <Route path={`/signup`} component={OwnerSignup} />
      <Route path={`/owner/account`} component={Account} />
      <Route path={`/owner/create-room`} component={CreatPlace} />
      <Route path={`/owner/rooms/:room_id/preview`} component={OwnerPreviewRoom} />
      <Route path={`/owner/rooms/:room_id/rent_preview`} component={OwnerPreviewRoom} />
      <Route path={`/owner/rooms/:room_id/live_room`} component={OwnerPreviewRoom} />
      <Route path={`/owner/rooms/:room_id/pending`} component={OwnerPreviewRoom} />
      <Route path={`/owner/rooms/:room_id/view`} component={ViewRoom} />
      <Route path={`/owner/rooms/:room_id/renew`} component={RenewRoom} />
      <Route path={`/owner/rooms/:room_id/edit`} component={EditRoom} />

      <Route exact path={`/admin`} component={AdminHome} />
      <Route path={`/admin/account`} component={Account} />
      <Route path={`/admin/rooms/:room_id/preview`} component={AdminPreviewRoom} />
      <Route path={`/admin/dashboard`} component={Dashboard} />
      
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
