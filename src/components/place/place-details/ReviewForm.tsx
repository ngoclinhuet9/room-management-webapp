/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// @refresh reset
import {
  Box,
  Avatar,
  Heading,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const ReviewForm = ({ addReview }: { addReview: Function }) => {
  const toast = useToast()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentSuccess, setCommentSuccess] = useState(false)
  const [disable, setDisable] = useState(true)

  const handleSubmit = () => {
    console.log(comment)
    addReview({ comment, score })
  }

  return (
    <Box className='single-review' my={8}>
      <Box display='flex' flexDirection='row'>
        <Avatar name='Me' />
        <Box ml={2} display='flex' pt={1}>
          <Box>
            <Heading
              as='h5'
              fontWeight='bolder'
              lineHeight='shorter'
              fontSize='md'
            />
          </Box>
          <Box display='flex' marginLeft={3} color='#FFB500' pt={0.25}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Box key={value} fontSize='24px' onClick={() => setScore(value)}>
                {score < value ? <AiOutlineStar /> : <AiFillStar />}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className='reviews-content' mt={5}>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Để lại bình luận về địa điểm này'
          size='md'
          resize='none'
        />
        <Button
          // disabled={disable || commentLoading}
          onClick={handleSubmit}
          ml='700px'
          backgroundColor='#F66038'
          color='white'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default ReviewForm
