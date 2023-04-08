import { Box, Text, Image } from '@chakra-ui/react'

type Props = {
  [key: string]: string
}

const MediaBox = ({ imageUrl, title, description }: Props) => (
  <Box mt={12} color='black'>
    <Image src={imageUrl} width='65px' height='70px' />
    <Box as='h3' mt={6} mb={3.5} fontSize='lg' fontWeight='black'>
      {title}
    </Box>
    <Text>{description}</Text>
  </Box>
)

export default MediaBox
