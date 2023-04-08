import React, { useEffect, useState } from 'react'
import CreatePlace from 'pages/owner/CreatPlace'
import { Link, useParams } from 'react-router-dom'
import axios from 'utils/axios'

type Params = {
  room_id: string
}
function RenewRoom() {
  const params: Params = useParams()
  const [rentRoom, setRentRoom] = useState<any>([])
  useEffect(() => {
    axios
      .get(`/rooms/${params?.room_id}`)
      .then((res) => {
        setRentRoom(res.data.data.room)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <CreatePlace data={rentRoom} status='renew' />
    </>
  )
}

export default RenewRoom
