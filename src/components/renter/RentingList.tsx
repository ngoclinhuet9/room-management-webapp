/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, useToast, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'

function RentingList() {
  const toast = useToast()
  const columns = [
    {
      title: 'Tên Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text: string) => <a>{text}</a>,
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
      title: 'Yêu cầu',
      dataIndex: 'request',
      key: 'request',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
  const [rentingList, setRentingList] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/renters/renting`)
      .then((res) => {
        let result: any[] = []
        console.log(res.data.data);
        
        res.data.data.forEach((item: any) => {
          result.push({
            roomName: item.room?.name,
            ownerName: item.room.user?.name,
            ownerPhone: item.room.user?.phone,
            ownerEmail: item.room.user?.email,
            request: item?.requestType == 0 ? 'Thuê phòng' : " Trả phòng",
            status: item?.status == 0 ? 'Đã phê duyệt' : 'Chờ phê duyệt',
            _id: item.room?._id,
          })
        })
        setRentingList(result)
        console.log(rentingList,'linh');
        
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return <Table columns={columns} dataSource={rentingList} />
}

export default RentingList
