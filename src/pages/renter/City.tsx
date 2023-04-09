import React, { useEffect, useState } from 'react'
import Search from 'components/filter/Search'
import RoomList from 'components/roomlist/RoomList'
import Layout from 'layouts/Layout'
import axios from 'utils/axios'
import { useHistory, useParams } from 'react-router-dom'
import { Text, Box, Select, Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

type Params = {
  city: string
  roomType: string
  minPrice: string
  maxPrice: string
}

const City = () => {
  const [roomList, setRoomList] = useState([])
  const params: Params = useParams()
  const history = useHistory()
  useEffect(() => {
    axios
      .get('/rooms', { params: history.location.state })
      .then((res) => {
        setRoomList(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params?.city, history.location.state])
  return (
    <Layout>
      <Search data={history.location.state} />
      <Box display='flex'>
        <Text fontSize='28px' fontWeight='semibold' mx={22} mt={5} ml='125px'>
          {`Kết quả search- ${roomList?.length} phòng`}
        </Text>
        <Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Sắp xếp
          </MenuButton>
          <MenuList>
            <MenuItem>Bán chạy nhất</MenuItem>
            <MenuItem>Giá tăng dần</MenuItem>
            <MenuItem>Giá giảm dần</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <RoomList roomList={roomList} />
    </Layout>
  )
}

export default City
