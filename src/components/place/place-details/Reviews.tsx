
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Avatar,
  Box,
  chakra,
  Divider,
  Heading,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'utils/axios'
import { AiFillStar } from 'react-icons/ai'
import { Element } from 'react-scroll'
import ReviewForm from './ReviewForm'

type RatingType = {
  score: number
  comment: string
  user_name: string
  user_avatar: string
}[]

const Reviews = ({ roomId, reviews }: { roomId: string | undefined, reviews: any }) => {
  const NavLabel = chakra(Element)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState([]) as any
  const addReview = ({
    comment,
    score,
  }: {
    comment: string
    score: number
  }) => {
    setData([...data, { content: comment, rating: score }])
    axios.post('/reviews/create', { content: comment, rating: score, roomId })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    setData(reviews)
  }, [reviews])

  return (
    <NavLabel className='place-details-reviews' name='reviews' mt={20}>
      <Box className='reviews-title'>
        <Heading
          as='h3'
          fontSize='3xl'
          fontWeight='bolder'
          lineHeight='shorter'>
          Đánh giá
        </Heading>
      </Box>
      {data?.length &&
        data?.map((r: any) => (
          <Box className='single-review' my={8}>
            <Box display='flex' flexDirection='row'>
              <Avatar name={r.renter?.name || 'Me'} />
              <Box ml={2} display='flex' pt={1}>
                <Box>
                  <Heading
                    as='h5'
                    fontWeight='bolder'
                    lineHeight='shorter'
                    fontSize='md'>
                    {!isLoading ? (
                      r.renter?.name || 'Me'
                    ) : (
                        <Skeleton mt={1} height='12px' width='120px' />
                      )}
                  </Heading>
                </Box>
                <Box display='flex' marginLeft={3} color='#FFB500' pt={0.25}>
                  {[...Array(r.rating)].map((_, idx) => (
                    <AiFillStar fontSize={24} key={idx} />
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className='reviews-content' mt={5}>
              <Text color='#555'>
                {!isLoading ? (
                  r.content
                ) : (
                    <Skeleton mt={1} height='12px' width='240px' />
                  )}
              </Text>
            </Box>
          </Box>
        ))}
      <Divider />
      {localStorage.getItem('token') ? <ReviewForm addReview={addReview} /> : null}
    </NavLabel>
  )
}

export default Reviews
