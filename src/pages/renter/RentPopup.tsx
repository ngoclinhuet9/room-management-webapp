import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import PlaceDetailsComponent from 'components/place/place-details/PlaceDetailsComponents'
import { useParams } from 'react-router-dom'
import axios from 'utils/axios'
import { Popup } from 'react-leaflet'

type Params = {
  room_id: string
}
function RentPopup() {
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const params: Params = useParams()
  const [rentRoom, setRentRoom] = useState<any>([])
  function togglePopup() {
    setPopupVisible(!popupVisible)
  }
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
    <Box
      width='100%'
      height='100%'
      padding='200px 100px'
      backgroundColor='black'
      opacity='0.4'
      border='1px solid gray'>
      <Box background='white' opacity='1'>
        <a align-item='right'>X</a>
        <Box
          width='100%'
          border-bottom='1px solid gray'
          font-size='18px'
          text-align='center'
          padding='5px'>
          Modal Title
        </Box>
        <div>TextTexxtTexxxxxxxxxxxxxxx</div>
      </Box>
    </Box>
  )
}

export default RentPopup
