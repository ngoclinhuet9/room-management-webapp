import { Box, Link, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link as ReactLink, useHistory } from 'react-router-dom'

type Props = {
  name: string
  imageUrl: string
  city: string
}

function TopDestinationBox ({ name, imageUrl, city }: Props) {
  const minPrice = ''
  const maxPrice = ''
  const roomType = ''
  const history = useHistory()
  const onSearch = () =>  {
      history.push({
        pathname: '/renter/search',
        state: { city, roomType, minPrice, maxPrice }
      })
    }
  return (
      <Box w='263px' h='310px' onClick={onSearch}>
        <Link
          h='100%'
          w='95%'
          display='inline-block'
          textDecoration='none'
          transition='all .3s'>
          <Box position='relative' h='100%'>
            <Box position='relative'>
              <Box
                position='absolute'
                top='0'
                left='0'
                objectFit='cover'
                width='100%'
                height='100%'>
                <Box borderRadius='md' overflow='hidden'>
                  <Image src={imageUrl} height='420px' width='336px' />
                </Box>
              </Box>
            </Box>
            <Box position='absolute' bottom={8} color='white' left={4}>
              <Box as='h4' fontWeight='bold' fontSize='2xl' color='white'>
                {name}
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
  )}

export default TopDestinationBox
