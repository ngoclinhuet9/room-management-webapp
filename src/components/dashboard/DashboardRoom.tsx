import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Pie, measureTextWidth } from '@ant-design/plots'
import axios from 'utils/axios';

const DashboardRoom = () => {
  const [data, setData] = useState<{type: string, value: any}[]>([])
  function renderStatistic(containerWidth: number, text: string, style: { fontSize: number; }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  useEffect(() => {
    axios
      .get(`/admin/getDashboadRoom`)
      .then((res) => {
        setData([
          {
            type: 'Pending Room',
            value: res.data.data.pendingRoom,
          },
          {
            type: 'Live Room',
            value: res.data.data.liveRoom,
          },
          {
            type: 'Rented Room',
            value: res.data.data.rentedRoom,
          }
        ])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (
          container: { 
            getBoundingClientRect: () => { 
              width: any; 
              height: any; 
            }; 
          }, 
          value: any,
          datum: any
        ) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Tổng phòng:';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
          offsetY: 4,
          style: {
            fontSize: '32px',
          },
          customHtml: (
            container: { 
              getBoundingClientRect: () => {
                width: any;
              }; 
            }, 
            value: any,
            datum: any,
            data: any
          ) => {
            const { width } = container.getBoundingClientRect();
            const text = datum ? `${datum.value} phòng` : `${data.reduce((r: any, d: any) => r + d.value, 0)} phòng`;
            return renderStatistic(width, text, {
              fontSize: 32,
            });
          },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config}></Pie>;
};

export default DashboardRoom
