import React from 'react'
import {BrowserRouter, Route, Router, Switch, useLocation, useRouteMatch} from 'react-router-dom'

import RenterRouter from './renter'
import AdminRouter from './admin'
import OwnerRouter from './owner'
import NotFound from '../pages/static-page/NotFound'
import Home from '../pages/renter/Home';
import Login from '../pages/renter/Login';
import RoomDetail from '../pages/renter/Detail';
import SearchResult from '../pages/renter/City';
import Signup from '../pages/renter/Signup';
import Account from '../pages/renter/Account';
import Bookmark from '../pages/renter/Bookmark';
import CreatPlace from '../pages/owner/CreatPlace';
import PreviewRoom from '../components/owner/PreviewRoom';
import ViewRoom from '../components/owner/ViewRoom';
import RenewRoom from '../pages/owner/RenewRoom';
import EditRoom from '../pages/owner/EditRoom';

function App() {
  return (
    <Route
      path='/'
      render={() => {
        const pathname = window.location.pathname
        if (pathname.startsWith("/renter") || pathname === '/') return <RenterRouter />
        else {
          if (pathname.startsWith('/admin')) return <AdminRouter />
          if (pathname.startsWith('/owner')) return <OwnerRouter />
        }
        return <NotFound />
      }}
    />
    // <BrowserRouter>
    //   <Route path='/admin'>
    //     <AdminRouter />
    //   </Route>
    //   <Route path='/owner'>
    //     <OwnerRouter />
    //   </Route>
    //   <Route path='/renter'>
    //     <RenterRouter />
    //   </Route>
    //   <Route path='/'>
    //     <RenterRouter />
    //   </Route>
    // </BrowserRouter>
  )
}

export default App
