
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
  useToast,
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

const Reviews = ({ roomId, reviews, isStar }: { roomId: any | undefined, reviews: any, isStar: boolean }) => {
  const NavLabel = chakra(Element)
  const toast = useToast()
  const [isLoading, setLoading] = useState(false);
  const userName = JSON.parse(localStorage.getItem('infoUser') as string).name


  const [data, setData] = useState([]) as any
  const addReview = ({
    comment,
    score,
  }: {
    comment: string
    score: number
  }) => {
    if (comment) {
      axios.post('/reviews/create', { content: comment, rating: score, roomId, type: 1 })
        .then((res) => {
          setData([...data, { content: comment, rating: score, user: { name: userName } }])
        })
        .catch((err) => {
          toast({
            title: 'Có sự cố xảy ra:',
            description: 'Cần đăng nhập để đặt phòng.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        })
    }
    else {
      toast({
        title: 'Có sự cố xảy ra:',
        description: 'Vui lòng nhập nội dung đánh giá',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }
  useEffect(() => {
    setData(reviews)
  }, [reviews])

  return (
    <NavLabel className='place-details-reviews' name='reviews'>
      {data?.length !== 0 ?
        data?.map((r: any) => (
          <Box className='single-review' my={8}>
            <Box display='flex' flexDirection='row'>
              <Avatar name={r.user?.name || 'Me'} />
              <Box ml={2} display='flex' pt={1}>
                <Box>
                  <Text fontSize='xl'>{!isLoading ? (
                      r.user?.name || 'Me'
                  ) : (
                      <Skeleton mt={1} height='12px' width='120px' />
                  )}</Text>
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
        )) : <span>Chưa có đánh giá nào</span>
      }
      <Divider />
      {
        isStar && <ReviewForm isComment={false} addReview={addReview} isStar={isStar} />
      }
    </NavLabel>
  )
}

export default Reviews
