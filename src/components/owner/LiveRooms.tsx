/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, useToast, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'
import { AmountFormat } from 'utils/amountFormat'

function LiveRooms() {
  const toast = useToast()
  const columns = [
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'roomPrice',
      key: 'roomPrice',
    },
    {
      title: 'Diện tích (m2)',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <Box>
          <Button colorScheme='orange' mr='10px'>
            <Link to={`/owner/rooms/${id}/live_room`}>Xem</Link>
          </Button>
          <Button colorScheme='orange' mr='5px'>
            <Link to={`/owner/rooms/${id}/edit`}>Sửa</Link>
          </Button>
        </Box>
      ),
    },
  ]
  const [liveRoom, setLiveRoom] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/owner/rooms/ready`)
      .then((res) => {
        let result: any[] = []
        res.data.data.forEach((item: any) => {
          result.push({
            name: item?.name,
            address: item?.address,
            //roomType: item?.roomType,
            roomPrice: AmountFormat(item?.roomPrice),
            area: item?.area,
            _id: item?._id,
            roomType: item?.roomType ==='APARTMENT' ? 'Chung cư' 
            : (item?.roomType === 'MOTEL'? 'Nhà trọ' : (item?.roomType === 'WHOLE_HOUSE' ? 'Nhà nguyên căn' : 'Chung cư nguyên căn'))
          })
        })
        setLiveRoom(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={liveRoom} />
}

export default LiveRooms
