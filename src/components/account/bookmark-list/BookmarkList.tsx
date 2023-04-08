import React, { useEffect, useState } from 'react'
import RoomList from '../../roomlist/RoomList'
import axios from 'axios'

function BookmarkList() {
  const [roomList, setRoomList] = useState([]) as any
  useEffect(() => {
    axios.get('/bookmarks').then((res) => {
      const temp = [] as any
      res.data.data.forEach((room: any) => {
        temp.push(room.room)
      })
      setRoomList(temp)
    })
  })
  return (
    <>
      <RoomList roomList={roomList} />
    </>
  )
}

export default BookmarkList
