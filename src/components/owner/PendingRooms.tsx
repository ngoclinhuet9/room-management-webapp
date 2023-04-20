/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'

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
      title: 'Giá',
      dataIndex: 'roomPrice',
      key: 'roomPrice',
    },
    {
      title: 'Diện tích',
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
            <Link to={`/owner/rooms/${id}/pending`}>Xem</Link>
          </Button>
          <Button colorScheme='orange' mr='5px'>
            <Link to={`/owner/rooms/${id}/edit`}>Sửa</Link>
          </Button>
        </Box>
      ),
    },
  ]
  const [pendingRoom, setpendingRoom] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/owner/rooms/pending`)
      .then((res) => {
        setpendingRoom(res.data.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={pendingRoom} />
}

export default PendingRooms
