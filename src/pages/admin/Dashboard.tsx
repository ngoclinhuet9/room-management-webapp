import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import DashboardRoom from 'components/dashboard/DashboardRoom'
import DashBoardRentRate from 'components/dashboard/DashboardRentedRate'
import { Box, Text } from '@chakra-ui/react'

function Dashboard() {
  return (
    <AdminLayout title='Home'>
      <Text fontSize='30x' fontWeight='semibold' mx={22} mt={5} ml='125px' mb='20px'>
            Dashboard
          </Text>
      <Box display='flex' justifyContent='space-between' margin='auto 90px'>
        <Box border='solid 1px' padding='10px'>
          <DashBoardRentRate />
          <Text fontSize='20px' fontWeight='semibold' mx={22} mt={5} ml='125px' textAlign='center'>
            Số liệu đặt phòng trong 30 ngày gần nhất
          </Text>
        </Box>
        <Box width='599px' border='solid 1px' padding='10px'>
          <DashboardRoom />
          <Text fontSize='20x' fontWeight='semibold' mx={22} mt={5} ml='125px' textAlign='center'>
            Trạng thái các phòng
          </Text>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default Dashboard