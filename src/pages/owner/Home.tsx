import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Link,
} from '@chakra-ui/react'

import { useHistory } from 'react-router-dom'
import OwnerLayout from 'layouts/OwnerLayout'
import LiveRooms from 'components/owner/LiveRooms'
import PendingRooms from 'components/owner/PendingRooms'
import RentedRooms from 'components/owner/RentedRooms'
import RejectRooms from 'components/owner/RejectRooms'

export default function Header() {
  const history = useHistory()
  const create = async () => {
    history.push('/owner/create-room')
  }
  return (
    <OwnerLayout title='Home'>
      <Button
        colorScheme='orange'
        position='absolute'
        top='100px'
        right='180px'
        onClick={create}>
        Tạo phòng mới
      </Button>
      <Tabs
        size='md'
        variant='enclosed'
        colorScheme='orange'
        m='20px auto'
        w='80%'>
        <TabList>
          <Tab>Phòng đang trống</Tab>
          <Tab>Phòng chờ phê duyệt</Tab>
          <Tab>Phòng đang cho thuê</Tab>
          <Tab>Danh sách bị từ chối</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LiveRooms />
          </TabPanel>
          <TabPanel>
            <PendingRooms />
          </TabPanel>
          <TabPanel>
            <RentedRooms />
          </TabPanel>
          <TabPanel>
            <RejectRooms />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </OwnerLayout>
  )
}
