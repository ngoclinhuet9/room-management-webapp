/* eslint-disable no-plusplus */
// /* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'utils/axios'

function OwnerList() {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
    ]

    const data = []
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      })
    }
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'CMND', dataIndex: 'identity', key: 'identity' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  ]

  const [ownerList, setOwnerList] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/owners/approved`)
      .then((res) => {
        const { data } = res.data
        const temp: any = []
        data.forEach((item: any, index: number) => {
          temp.push({ ...item.owner, _id: item._id, key: index })
        })
        setOwnerList(temp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Table
      className='components-table-demo-nested'
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={ownerList}
    />
  )
}
export default OwnerList
