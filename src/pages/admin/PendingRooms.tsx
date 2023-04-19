/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'
import 'antd/dist/antd.css'

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
        setpendingRoom(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={pendingRoom} />
}

export default PendingRooms
