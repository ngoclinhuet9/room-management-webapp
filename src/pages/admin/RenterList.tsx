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
          temp.push({ ...item.renter })
        })
        setRenterList(temp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const columns = [
    {
      title: 'Name',
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
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: any) => (
        <>
          <Tag color={isActive ? 'green' : 'red'}>{isActive}</Tag>
        </>
      ),
    },
  ]

  return <Table columns={columns} dataSource={renterList} />
}

export default RenterList
