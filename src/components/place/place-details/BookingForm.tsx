/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable camelcase */
import { Box, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AmountFormat } from 'utils/amountFormat'

const BookingForm = ({ roomPrice, waterPrice, electricityPrice, amount }: any) => {
  return (
    <Box position='sticky' borderRadius='3px' mt={20}>
      <Box border='1px solid #e9e9e9' borderRadius='4px'>
        <Box px={13} pt={6}>
          <Text textAlign='center' mb={5} fontWeight='bolder' fontSize='20px' >
            BẢNG GIÁ PHÒNG
          </Text>
          <Box className='pricing'>
            <Stack direction='row' align='baseline' mb={2}>
              <Text fontWeight='bolder' fontSize='3xl' textColor='orange'>
                {AmountFormat(roomPrice)}₫
              </Text>
              <Text fontSize='sm'>/tháng</Text>
            </Stack>
            <Stack direction='row' align='baseline'>
              <Text>Giá điện</Text>
              <Text fontWeight='bolder' fontSize='xl' textColor='orange'>
                {AmountFormat(electricityPrice)}₫
              </Text>
              <Text fontSize='sm'>/số</Text>
            </Stack>
            <Stack direction='row' align='baseline' mb={2}>
              <Text>Giá nước</Text>
              <Text fontWeight='bolder' fontSize='xl' textColor='orange'>
                {AmountFormat(waterPrice)}₫
              </Text>
              <Text fontSize='sm'>/số</Text>
            </Stack>
            <Stack direction='row' align='baseline' mb={2}>
              <Text>Tiền cọc</Text>
              <Text fontWeight='bolder' fontSize='xl' textColor='orange'>
                {AmountFormat(amount)}₫
              </Text>
              <Text fontSize='sm'>/số</Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BookingForm
