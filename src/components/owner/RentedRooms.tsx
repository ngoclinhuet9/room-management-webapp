/* eslint-disable react/display-name */
import { Table } from 'antd'
import { Button, useToast } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'utils/axios'



type Params = {
  room_id: string
}
function RentedRooms() {
  const toast = useToast()
  const params: Params = useParams()
  const [payFlag, setPayFlag] = useState(false)
  const columns = [
    {
      title: 'Tên Phòng',
      dataIndex: 'roomName',
      key: 'roomName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Người Thuê',
      dataIndex: 'renterName',
      key: 'renterName',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'renterPhone',
      key: 'renterPhone',
      render: (text: number) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'renterEmail',
      key: 'renterEmail',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Action',
      dataIndex: 'renterRoomID',
      key: 'renterRoomID',
      render: (id: any) => (
        <Button colorScheme='orange' mr='10px'>
          <Link to={`/owner/rooms/${id}/rent_preview`}>Xem</Link>
        </Button>
      ),
    },
  ]
  const [rentRoom, setRentRoom] = useState<any[]>([])
  useEffect(() => {
    axios
      .get(`/owner/rooms/rent`)
      .then((res) => {
        let result: any[] = []
        res.data.data.forEach((item: any) => {
          result.push({
            roomName: item.room?.name,
            renterName: item.user?.name,
            renterPhone: item.user?.phone,
            renterEmail: item.user?.email,
            renterRoomID: item._id,
            payFlag: item?.payFlag,
            status: item?.payFlag ? 'Đã thanh toán' : 'Chưa thanh toán',
          })
        })
        setRentRoom(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log(rentRoom, 'n----linh')
  // const handleRemake = (id: any) => {
  //   axios
  //     .put(`/owner/rooms/${id}/return`)
  //     .then((res) => {
  //       console.log(res)
  //       setRentRoom(rentRoom.filter((item: any) => item._id !== id))
  //       toast({
  //         title: 'Thành công',
  //         description: 'Bạn đã remake thành công',
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top',
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast({
  //         title: 'Có sự cố xảy ra',
  //         description: 'Bạn không đủ quyền để truy cập trang này',
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //         position: 'top',
  //       })
  //     })
  // }
  return <Table columns={columns} dataSource={rentRoom} />
}

export default RentedRooms
