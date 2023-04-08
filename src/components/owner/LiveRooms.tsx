/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, useToast, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'

function LiveRooms() {
  const toast = useToast()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'roomPrice',
      key: 'roomPrice',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <Box>
          <Button colorScheme='orange' mr='10px'>
            <Link to={`/owner/rooms/${id}/live_room`}>Xem</Link>
          </Button>
          <Button colorScheme='orange' mr='5px'>
            <Link to={`/owner/rooms/${id}/edit`}>Edit</Link>
          </Button>
        </Box>
      ),
    },
  ]
  const [pendingRoom, setpendingRoom] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/owner/rooms/ready`)
      .then((res) => {
        setpendingRoom(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={pendingRoom} />
}

export default LiveRooms
