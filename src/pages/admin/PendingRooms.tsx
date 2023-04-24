/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'
import 'antd/dist/antd.css'
import { AmountFormat } from 'utils/amountFormat'

function PendingRooms() {
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
        <Button colorScheme='orange' mr='10px'>
          <Link to={`/admin/rooms/${id}/preview`}>Xem</Link>
        </Button>
      ),
    },
  ]
  const [pendingRoom, setpendingRoom] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/rooms/pending`)
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
        setpendingRoom(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={pendingRoom} />
}

export default PendingRooms
