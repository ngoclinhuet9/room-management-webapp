/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import HomeComponent from 'components/home/Home'
import Layout from '../../layouts/Layout'
import { useParams, useRouteMatch } from 'react-router-dom'
import axios from 'utils/axios'

export default function Home() {
  const toast = useToast()
  const router = useRouteMatch;
  const vnp_Param = useParams();
  const vnp_Params = new URLSearchParams(window.location.search)



  useEffect(() => {
    console.log(vnp_Params.get('vnp_ResponseCode'), '========');
    const status = vnp_Params.get('vnp_ResponseCode');
    if (status == '00') {
      axios
      .put(`/renters/rentByPay`, {vnp_Params})
      .then((res) => {
        window.open(res.data.data.vnpUrl)
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: 'Có sự cố xảy ra',
          description: 'Bạn không đủ quyền để truy cập trang này',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
      
      alert('Success payment!!!!!!!');
      
      // redirec to URL
    }
    
  }, [])
  return (
    <></>
  )
}
