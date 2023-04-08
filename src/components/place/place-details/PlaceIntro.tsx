/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable camelcase */
import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BiLocationPlus, BiBuildings } from 'react-icons/bi'
import { Element } from 'react-scroll'

const PlaceIntro = ({
  name,
  address,
  roomData,
  placeType,
  kitchenType,
  bathRoomType,
  ownerName,
  description,
  isWithOwner,
}: any) => {
  const NavLabel = chakra(Element)
  const [truncated, setTruncated] = useState(true)
  return (
    <NavLabel className='place-details-overviews' name='overview'>
      <Box>
        <Flex justifyContent='space-between'>
          <Heading as='h1' fontSize='4xl' flexBasis='77%' fontWeight='bolder'>
            {name}
          </Heading>
          <Box flexBasis='16%' alignContent='center' textAlign='end'>
            <Avatar
              size='lg'
              src='https://cdn.luxstay.com/rooms/34370/large/2f78a6f10c83e81708f369287c87e4b6.png'
            />
            <Text>{ownerName}</Text>
          </Box>
        </Flex>
      </Box>
      <Box mt={4} fontSize='sm'>
        <Flex
          justifyContent='flex-start'
          flexDirection='row'
          alignItems='center'>
          <BiLocationPlus size='1.5rem' />
          <Text fontWeight='bolder' ml={3}>
            {address}
          </Text>
        </Flex>
      </Box>
      <Box mt={3} fontSize='sm'>
        <Flex
          justifyContent='flex-start'
          flexDirection='row'
          alignItems='center'>
          <BiBuildings size='1.5rem' />
          <Text fontWeight='bolder' ml={3}>
            {placeType}
          </Text>
          <Text fontWeight='medium' fontSize='medium' ml={5}>
            Diện tích · {roomData} m<sup>2</sup>
          </Text>
        </Flex>
      </Box>
      <Box mt={4}>
        <Stack spacing='5px' direction='column'>
          <Text>Phòng bếp : {kitchenType} </Text>
          <Text>Phòng tắm : {bathRoomType}</Text>
          <Text>
            Chung chủ : {isWithOwner ? 'Có chung chủ' : 'Không chung chủ'}
          </Text>
        </Stack>
      </Box>
      <Box mt='36px'>
        <Box>
          <Box position='relative'>
            <Text fontWeight='bolder'>Mô tả</Text>
            <Box id='short-intro' lineHeight='taller'>
              <Text
                fontSize='md'
                color='#222'
                isTruncated={truncated}
                noOfLines={truncated ? 3 : 0}>
                {description}
              </Text>
              <Button
                onClick={() => setTruncated(!truncated)}
                color='#f65e39'
                variant='link'
                outline={0}>
                {truncated ? 'Đọc thêm' : 'Thu gọn'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </NavLabel>
  )
}

export default PlaceIntro
