
import React, { useEffect, useState } from 'react'
import { List, Avatar } from 'antd'
import { firestore } from 'firebase-config'
import axios from 'utils/axios'

type Notification = {
  roomName: string,
  roomId: string,
  type: string
}
function Notifi({ role }: { role: string }): any {
  const [data, setData] = useState<Array<Notification>>([])
  const initData = async () => {
    axios.get('/profile').then(async (res) => {
      const dataTemp = res.data.data as any
      // await firestore().collection('notifications').where('receiver', '==', dataTemp?._id).onSnapshot(async (documentSnapshot) => {
      //   let notifications = [] as Array<Notification>
      //   await documentSnapshot.forEach(async (doc) => {
      //     const room = await axios.get(`/rooms/${doc.data().roomId}`)
      //     notifications.push({
      //       roomName: room.data.data.room?.name,
      //       roomId: doc.data().roomId,
      //       type: doc.data().type
      //     })
      //     // await setData([...data, {
      //     //   roomName: room.data.data.room?.name,
      //     //   roomId: doc.data().roomId,
      //     //   type: doc.data().type
      //     // }])
      //     console.log(data)
      //     // await setData([...data, {
      //     //   roomName: room.data.data.room?.name,
      //     //   roomId: doc.data().roomId,
      //     //   type: doc.data().type
      //     // }])
      //   })
      //   setData(notifications)
      // })
    })
  }
  useEffect(() => {
    initData()
  }, [])
  return (<List
    itemLayout='horizontal'
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          }
          title={<a href='https://ant.design'>{item?.roomName}</a>}
          description='Ant Design, a design language for background applications, is refined by Ant UED Team'
        />
      </List.Item>
    )}
  />)
}

export default Notifi
