import React from 'react'
import Layout from 'layouts/Layout'
import Header from 'components/account/Header'
import SideBar from 'components/account/edit-account/SideBar'

function Account() {
  return (
    <Layout title = 'Cài đặt tài khoản'>
      {window.location.pathname.startsWith('/renter')?
      <Header />
      :null
      }
      <SideBar />
    </Layout>
  )
}

export default Account
