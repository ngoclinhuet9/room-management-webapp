
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */

import { Box, Image, Text, Stack, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AmountFormat } from 'utils/amountFormat'

function RoomItem({
  placeId,
  name,
  placeType,
  price,
  ratings,
  rate,
  countRent,
  isLoading,
  image,
}: Partial<{
  placeId: string
  name: string
  placeType: string
  price: number
  ratings?: []
  rate:any
  countRent: number
  isLoading: boolean
  image: string
}>) {
  let avg = 0
  let sum = 0
  ratings?.forEach((r: any) => {
    sum += r.score
  })

  avg = ratings?.length === 0 ? sum / ratings?.length : 0
  const [roomType, setRoomType] = useState('')
  useEffect(() => {
    if(placeType == 'MOTEL') {setRoomType('Phòng trọ')}
    if(placeType == 'APARTMENT') {setRoomType('Chung cư')}
    if(placeType == 'WHOLE_HOUSE') {setRoomType('Nhà nguyên căn')}
    if(placeType == 'WHOLE_APARTMENT') {setRoomType('Chung cư nguyên căn')}
  }, [])
  return (
    <Box mt={3} w='100%' mx='0.3rem' my='0.4rem'>
      <Box>
          <Box
            sx={{
              ':before': {
                content: '""',
                display: 'block',
                width: '100%',
              },
            }}
            position='relative'
            zIndex='0'>
            {isLoading ? (
              <Skeleton
                width='100%'
                height={230}
                top={0}
                left={0}
                objectFit='cover'
                borderRadius='3px'
              />
            ) : (
                <Link to={`/renter/rooms/${placeId}`}>
                  <Image
                    cursor='pointer'
                    fallbackSrc='https://www.luxstay.com/loading-img.svg'
                    width='100%'
                    height={230}
                    top={0}
                    left={0}
                    objectFit='cover'
                    borderRadius='3px'
                    src={image}
                  />
                </Link>
              )}
          </Box>
          <Box mt={3} fontSize={18} color='#222'>
            {isLoading ? (
              <Skeleton my={0.5} width='100%' height={3} />
            ) : (
                <Box my={0.5}>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Text fontSize='sm' color='#718096'>
                      {roomType}
                    </Text>
                    <Text fontSize='sm' color='#718096'>
                      {rate}/5.0
                    </Text>
                    {/* <Stack fontSize='sm' direction='row'>
                      <AiFillStar color='#FFB025' size='18' />
                      <span>
                        {avg} ({ratings?.length})
                    </span>
                    </Stack> */}
                  </Box>
                </Box>
              )}

            <Box
              sx={{
                ':hover': {
                  color: '#f65e39',
                },
              }}
              cursor='pointer'
              transition='all .3s'
              fontWeight='bold'>
              {isLoading ? (
                <Skeleton height={5} width='50%' />
              ) : (
                <Link to={`/renter/rooms/${placeId}`}>
                    <Box
                      wordBreak='break-all'
                      overflow='hidden'
                      maxH='52px'
                      textOverflow='ellipsis'>
                      {name}
                    </Box>
                  </Link>
                )}
            </Box>
            {isLoading ? (
              <Skeleton mt={2} width='30%' height={3} />
            ) : (
                <Box
                mt={2} 
                display='flex'
                justifyContent='space-between'
                alignItems='center'>
                <Stack direction='row' spacing={3} fontSize={14}>
                  <Text fontWeight='bolder' textColor='orange'>{AmountFormat(price)}₫/tháng</Text>
                </Stack>
                <Text fontSize='sm' color='#718096'>
                  Đã thuê: {countRent}
                </Text>
                </Box>
              )}
          </Box>
      </Box>
    </Box>
  )
}

export default RoomItem
