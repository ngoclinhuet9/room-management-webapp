import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import DashboardRoom from 'components/dashboard/DashboardRoom'
import DashBoardRentRate from 'components/dashboard/DashboardRentedRate'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react'

function Dashboard() {
  return (
    <AdminLayout title='Thống kê'>
      <Box>
    <Breadcrumb
      padding='1.5rem 0'
      spacing='8px'
      separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href={'/admin'}>Trang chủ</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Thống kê</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  </Box>
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