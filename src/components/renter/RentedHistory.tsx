/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, useToast, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'

function Histories() {
  const toast = useToast()
  const columns = [
    {
      title: 'Tên Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'roomAddress',
      key: 'roomAddress',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Giá phòng',
      dataIndex: 'roomPrice',
      key: 'roomPrice',
    },
    {
      title: 'Chủ phòng',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'ownerPhone',
      key: 'ownerPhone',
    },
    {
      title: 'Email',
      dataIndex: 'ownerEmail',
      key: 'ownerEmail',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <Box>
          <Button colorScheme='orange' mr='10px'>
            <Link to={`/renter/rooms/${id}`}>Xem</Link>
          </Button>
        </Box>
      ),
    },
  ]
  const [histories, setHistories] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/renters/history`)
      .then((res) => {
        let result: any[] = []
        res.data.data.forEach((item: any) => {
          result.push({
            roomName: item.room?.name,
            roomPrice: item.room?.roomPrice,
            roomAddress: item.room?.roomAddress,
            ownerName: item.user?.name,
            ownerPhone: item.user?.phone,
            ownerEmail: item.user?.email,
            _id: item._id,
          })
        })
        setHistories(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={histories} />
}

export default Histories
