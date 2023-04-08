import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import DashboardRoom from 'components/dashboard/DashboardRoom'

function Dashboard() {
  return (
    <AdminLayout title='Home'>
      <DashboardRoom/>
    </AdminLayout>
  )
}

export default Dashboard