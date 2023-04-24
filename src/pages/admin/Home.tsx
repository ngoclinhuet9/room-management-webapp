import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AdminLayout from 'layouts/AdminLayout'
import PendingOwner from './PendingOwner'
import PendingRooms from './PendingRooms'
import OwnersList from './OwnerList'
import RenterList from './RenterList'

function Home() {
  return (
    <AdminLayout title='Home'>
      <Tabs maxW='90%' m='40px auto'>
        <TabList>
          <Tab>Chủ phòng chờ phê duyệt</Tab>
          <Tab>Phòng chờ phê duyệt</Tab>
          <Tab>Danh sách chủ phòng</Tab>
          <Tab>Danh sách người thuê phòng</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PendingOwner />
          </TabPanel>
          <TabPanel>
            <PendingRooms />
          </TabPanel>
          <TabPanel>
            <OwnersList />
          </TabPanel>
          <TabPanel>
            <RenterList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AdminLayout>
  )
}

export default Home
