import { Box, Link, Image } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

type Props = {
  name: string
  imageUrl: string
  url: string
}

const TopDestinationBox = ({ name, imageUrl, url }: Props) => {
  return (
    <ReactLink to={`/cities/${url}`}>
      <Box w='263px' h='310px'>
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
              <Box>
                <Box display='inline-block' fontWeight='bold'>
                  1000
                </Box>{' '}
                <Box display='inline-block' color='gray.100'>
                  Chỗ ở
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
    </ReactLink>
  )
}

export default TopDestinationBox
