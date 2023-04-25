/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box, useToast, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'utils/axios'

export default function ReturnScreen() {
  const toast = useToast()
  const [message, setMessage] = useState('')
  const vnp_Params = new URLSearchParams(window.location.search)
  const room_id = vnp_Params.get('room_id')
  const startDate = vnp_Params.get('startDate')
  const endDate = vnp_Params.get('endDate')
  const responseCode = vnp_Params.get('vnp_ResponseCode')
  let vnp_Param: any = {
    amount: vnp_Params.get('vnp_Amount'),
    orderInfor: vnp_Params.get('vnp_OrderInfo'),
    transactionNo: vnp_Params.get('vnp_TransactionNo'),
    responseCode: responseCode,
    transactionStatus: vnp_Params.get('vnp_TransactionStatus'),
    payDate: vnp_Params.get('vnp_PayDate'),
  } 

  useEffect(() => {
    if (vnp_Param?.responseCode === '00') {
      setMessage('Bạn đã thanh toán thành công')
    }
    else{
      setMessage('Thanh toán không thành công. Vui lòng thanh toán lại')
    }
  }, [vnp_Param])

  useEffect(() => {
    if (vnp_Param?.responseCode === '00') {
      axios
      .put(`/renters/rentByPay`, {room_id, vnp_Param,startDate, endDate})
      .then((res) => {
        if(responseCode === '200'){
          toast({
            title: 'Thành công',
            description: 'Bạn đã đặt phòng thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      })
      // .catch((err) => {
      //   console.log(err)
      //   toast({
      //     title: 'Lỗi',
      //     description: 'Phòng đã được thuê trước đó.',
      //     status: 'error',
      //     duration: 3000,
      //     isClosable: true,
      //     position: 'top',
      //   })
      // })
    }}, [room_id,vnp_Param,startDate, endDate])

  return (
    <Box>
    <Box display='flex' alignItems='center' justifyContent='center' h='50vh'>
      <Box textAlign='center'>
        <Box fontSize='1.5rem' fontWeight='bold' mt={8} mb={10}>
          {message}
        </Box>
          {vnp_Param?.responseCode === '00'?
            (<Button colorScheme='orange' mr='10px'>
              <Link to={`/renter/renting`}>Về danh sách phòng đang thuê</Link>
            </Button>)
            :
            (<Button colorScheme='orange' mr='10px'>
              <Link to={`/renter/rooms/${room_id}`}>Về màn hình chi tiết</Link>
            </Button>)}
          <Box textAlign='center'>
        </Box>
      </Box>
    </Box>
  </Box>
  )
}
