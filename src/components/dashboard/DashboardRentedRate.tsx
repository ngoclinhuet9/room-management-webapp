import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import axios from 'utils/axios';

const DashBoardRentRate = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`/admin/getDashBoardRentRate`)
      .then((res) => {
        setData(res.data.data)
        //data.sort((item1: any, item2: any) => item1._id > item2._id ? 1 : -1)
      })
      .catch((err: any) => {
        console.log(err)
      })
    
  }, []);

  
  const config = {
    data,
    xField: '_id',
    yField: 'count',
    xAxis: {
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: {
        isArea: true,
      },
    },
  };

  return <Area {...config} />;
};

export default DashBoardRentRate
