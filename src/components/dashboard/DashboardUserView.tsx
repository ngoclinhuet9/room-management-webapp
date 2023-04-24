import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
import axios from 'utils/axios';

const DashboardUserView = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`/admin/getDashBoardUserView`)
      .then((res) => {
        setData([
          {
            type: 'Người lạ',
            value: res.data.data.user,
            def: 'Số lượng truy cập',
          },
          {
            type: 'Người thuê phòng',
            value: res.data.data.renter,
            def: 'Số lượng truy cập',
          },
          {
            type: 'Chủ phòng',
            value: res.data.data.owner,
            def: 'Số lượng truy cập',
          },
          {
            type: 'Quản lý',
            value: res.data.data.admin,
            def: 'Số lượng truy cập',
          }
        ])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  const config: any = {
    data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: {
      position: 'top-left',
    },
  };
  return <Bar {...config} />;
};

export default DashboardUserView
