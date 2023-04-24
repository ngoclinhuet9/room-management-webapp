/* eslint-disable react/display-name */
import { Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'utils/axios'

function RenterList() {
  const [renterList, setRenterList] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/renters`)
      .then((res) => {
        const { data } = res.data
        const temp: any = []
        data.forEach((item: any) => {
          temp.push({ ...item, _id: item._id })
        })
        setRenterList(temp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'CMND',
      dataIndex: 'identity',
      key: 'identity',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: (isActive: any) => (
    //     <>
    //       <Tag color={isActive ? 'green' : 'red'}>{isActive}</Tag>
    //     </>
    //   ),
    // },
  ]

  return <Table columns={columns} dataSource={renterList} />
}

export default RenterList
