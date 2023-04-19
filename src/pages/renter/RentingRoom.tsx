import React from 'react'
import Layout from 'layouts/Layout'
import Header from 'components/account/Header'
import RentingList from 'components/renter/RentingList'
import { Box } from '@chakra-ui/react'

function RentingRoom(){
  return (
    <Layout title='Danh sách phòng đang thuê'>
      <Header />
      <Box maxW='90%' m='40px auto'>
        <RentingList />
      </Box>
    </Layout>
  )
}

export default RentingRoom
