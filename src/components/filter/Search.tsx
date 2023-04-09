/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Box,
  Flex,
  Button,
  Spacer,
  useDisclosure,
  Image,
  Select
} from '@chakra-ui/react'
import axios from 'utils/axios'

function Search(data: any) {
  // let priceValue = {data.minPrice + ' and ' + data.maxPrice
  const [city, setCity] = useState(data?.city)
  const [price, setPrice] = useState(data?.price)
  const [roomType, setRoomType] = useState(data?.roomType)
  const history = useHistory()
  useEffect(() => {
    const params: any = history.location.state;
    if (params) {
      setCity(params?.city);
      setPrice(`${params.minPrice} and ${params?.maxPrice}`);
      setRoomType(params?.roomType);
    }
  }, [history.location.state])
    const onSearch = () => {
      let minPrice = ''
      let maxPrice = ''
      if (price) {
        const res = price.split(' ')
        minPrice = res[0]
        maxPrice = res[2]
      }
      history.push({
        pathname: '/renter/search',
        state: { city, roomType, minPrice, maxPrice }
      })
    }
    const onClear = () => {
      setCity('')
      setPrice('')
      setRoomType('')
    }

  return (
    <Box
        height='85px'
        w='100%'
        mb={5}
        pb={3}
        mt='15px'
        display={{ sm: 'none', md: 'none', lg: 'block' }}
        borderBottom='1px solid rgb(226 232 240)'>
        <Flex
          display='flex'
          w='85%'
          height='100%'
          m='0 auto'
          justifyContent='center'
          alignItems='center'>
          <Box
            ml={2}
            w='100%'
            height='50px'
            borderRadius='6px'
            mr='15px'
            padding='15px 0px'
            boxShadow='1px 1px 4px rgba(0,0,0,.2)'>
            <Select
              alignItems='center'
              height='100%'
              width='100%'
              color='black'
              background='transparent'
              border='none'
              px={2}
              value={city}
              placeholder='Chọn thành phố'
              _placeholder={{ color: 'gray' }}
              _focus={{ outline: 'none' }}
              onChange={(event: any) => setCity(event.target.value)}>
              <option value='hanoi'>Hà Nội</option>
              <option value='hcm'>Hồ Chí Minh</option>
              <option value='danang'>Đà Nẵng</option>
              <option value='dalat'>Đà Lạt</option>
              <option value='vungtau'>Vũng Tàu</option>
              <option value='nhatrang'>Nha Trang</option>
              <option value='hoian'>Hội An</option>
              <option value='quangninh'>Quảng Ninh</option>
            </Select>
          </Box>
          <Box
            ml={2}
            w='100%'
            height='50px'
            borderRadius='6px'
            mr='15px'
            padding='15px 0px'
            boxShadow='1px 1px 4px rgba(0,0,0,.2)'>
            <Select
              height='100%'
              width='100%'
              color='black'
              background='transparent'
              border='none'
              px={2}
              value={price}
              placeholder='Chọn khoảng giá'
              _placeholder={{ color: 'gray' }}
              _focus={{ outline: 'none' }}
              onChange={(event) => setPrice(event.target.value)}>
              <option value='0 and 2000000'>0 - 2.000.000</option>
              <option value='2000000 and 5000000'>2.000.000 - 5.000.000</option>
              <option value='5000000 and 10000000'>
                5.000.000 - 10.000.000
              </option>
              <option value='10000000 and '>10.000.000 trở lên</option>
            </Select>
          </Box>
          <Box
            ml={2}
            w='100%'
            height='50px'
            borderRadius='6px'
            mr='15px'
            padding='15px 0px'
            boxShadow='1px 1px 4px rgba(0,0,0,.2)'>
            <Select
              height='100%'
              width='100%'
              color='black'
              background='transparent'
              border='none'
              px={2}
              value={roomType}
              placeholder='Chọn loại phòng'
              _placeholder={{ color: 'gray' }}
              _focus={{ outline: 'none' }}
              onChange={(event) => setRoomType(event.target.value)}>
              <option value='MOTEL'>Phòng trọ</option>
              <option value='APARTMENT'>Chung cư</option>
              <option value='WHOLE_HOUSE'>Nhà nguyên căn</option>
              <option value='WHOLE_APARTMENT'>Chung cư nguyên căn</option>
            </Select>
          </Box>
          <Box
            h="100%"
            alignItems='center'
            display='flex'
            pl={2}
          >
            <Box pl='2'>
            <Button width= '80px' colorScheme='orange' onClick={onSearch}>Search</Button>
            </Box>
            <Box pl='5'>
            <Button width= '80px' colorScheme='gray' onClick={onClear}>Clear</Button>
            </Box>
          </Box>
        </Flex>
    </Box>
    )
}

export default Search
