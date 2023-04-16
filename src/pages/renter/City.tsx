import React, { useEffect, useState } from 'react'
import Search from 'components/filter/Search'
import RoomList from 'components/roomlist/RoomList'
import Layout from 'layouts/Layout'
import axios from 'utils/axios'
import { useHistory, useParams } from 'react-router-dom'
import { Text, Box, Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

type Params = {
  city: string
  roomType: string
  minPrice: string
  maxPrice: string
}

const City = () => {
  const [roomList, setRoomList] = useState([])
  const [nameOrder, setNameOrder] = useState('Sắp xếp')
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

  const filterOptionChange = (value: any) => {
    let listData = roomList;
    switch (value) {
      case 'sale':
        listData.sort((item1: any, item2: any) => item1.countRent > item2.countRent ? 1 : -1)
        setNameOrder('Bán chạy nhất')
      break;

      case 'increase':
        listData.sort((item1: any, item2: any) => item1.roomPrice > item2.roomPrice ? 1 : -1)
        setNameOrder('Giá tăng dần')
      break;

      case 'decrease':
        listData.sort((item1: any, item2: any) => item1.roomPrice < item2.roomPrice ? 1 : -1)
        setNameOrder('Giá giảm dần')
      break;

    }
    setRoomList([...listData]);
  }

  return (
    <Layout>
      <Search data={history.location.state} />
      <Box display='flex' justifyContent='space-between'>
        <Text fontSize='28px' fontWeight='semibold' mx={22} mt={5} ml='125px'>
          {`Kết quả search- ${roomList?.length} phòng`}
        </Text>
        <Box margin='30px 110px'>
          <Menu>
            <MenuButton as={Button} width='150px' rightIcon={<ChevronDownIcon />}>
              {nameOrder}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => filterOptionChange('sale')} >Bán chạy nhất</MenuItem>
              <MenuItem onClick={() => filterOptionChange('increase')}>Giá tăng dần</MenuItem>
              <MenuItem onClick={() => filterOptionChange('decrease')}>Giá giảm dần</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <RoomList roomList={roomList} />
    </Layout>
  )
}

export default City
