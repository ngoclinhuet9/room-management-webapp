import React from 'react'
import Layout from 'layouts/Layout'
import Header from 'components/account/Header'
import Histories from 'components/renter/RentedHistory'
import { Box } from '@chakra-ui/react'

function History(){
  return (
    <Layout title='Lịch sử đặt phòng'>
      <Header />
      <Box maxW='90%' m='40px auto'>
        <Histories />
      </Box>
    </Layout>
  )
}

export default History
