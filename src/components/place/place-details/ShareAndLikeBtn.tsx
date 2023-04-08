
import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'utils/axios'
import { useState, useEffect } from 'react'

const ShareAndLikeBtn = ({
  roomId,
  isBookmarked,
}: {
  roomId: string | undefined
  isBookmarked: boolean
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  useEffect(() => {
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  const handleSubmit = () => {
    if (!bookmarked) {
      axios.post('/bookmarks/create', { roomId }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      setBookmarked(true)
    } else {
      axios.put('/bookmarks/delete', { roomId }).then((res) => {
        console.log(res)
      })
      setBookmarked(false)
    }
  }
  return (
    <Box>
      <Flex flexDirection='row'>
        <Button
          onClick={handleSubmit}
          outline='0'
          fontSize='1.25rem'
          variant='none'
          fontWeight='500'
          rightIcon={
            bookmarked ? (
              <FaHeart style={{ color: 'red' }} fontSize='18px' />
            ) : (
                <FaRegHeart fontSize='18px' />
              )
          }
          backgroundColor='#fff'>
          {bookmarked ? 'Huỷ lưu' : 'Lưu lại'}
        </Button>
      </Flex>
    </Box>
  )
}

export default ShareAndLikeBtn
