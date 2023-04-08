import {
  Container,
  Box,
  Flex,
  chakra,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-scroll'
import axios from 'utils/axios'
import { Link as ReactLink, useHistory, useParams } from 'react-router-dom'
import Header from 'components/layout/Header'
import { DatePicker, DatePickerProps } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Amenities from './Amenities'
import ImageSlider from './ImageSlider'
import Location from './Location'
import PlaceIntro from './PlaceIntro'
import PlaceRoute from './PlaceRoute'
import PolicyAndRule from './PolicyAndRule'
import BookingForm from './BookingForm'
import Reviews from './Reviews'
import ShareAndLikeBtn from './ShareAndLikeBtn'

type Intro = {
  _id: string
  name: string
  description: string
  address: string
  area: number
  roomType: string
  bathroomType: string
  kitchenType: string
  hasWaterHeater: boolean
  hasConditioner: boolean
  hasBalcony: boolean
  hasFridge: boolean
  hasBed: boolean
  hasWardrobe: boolean
  roomPrice: number
  waterPrice: number
  electricityPrice: number
  images: Array<string>
  owner: { name: string }
  rule: string
  city: string
}
type Params = {
  room_id: string
}

const PlaceDetailsComponent = () => {
  let date = new Date()
  const token = localStorage.getItem('token')
  const toast = useToast()
  const params: Params = useParams()
  const Nav = chakra('nav')
  const NavItem = chakra(Link)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showStickyNavBar, setShowStickyNavBar] = useState(false)
  const [inputDisable] = useState(true)
  const [details, setDetails] = useState<Intro>()
  const [isBookmarked, setIsBookmarked] = useState(true)
  const [reviews, setReviews] = useState([])
  const [startDate, setStartDate] = useState('2023/04/05')
  const [endDate, setEndDate] = useState('2023/04/05')
  const history = useHistory()
  const handleScroll = () => {
    const position = window.pageYOffset
    if (position >= 650) {
      setShowStickyNavBar(true)
    } else {
      setShowStickyNavBar(false)
    }
  }
  const next = async () => {
    if (startDate <= endDate) {
      try {
        const res = await axios({
          url: `/rooms/${params?.room_id}/booking`,
          method: 'post',
          data: {
            _startDate: startDate,
            _endDate: endDate,
          },
        })
        console.log(res)
        if (res) {
          toast({
            title: 'Thành công',
            description: 'Bạn đã gửi yêu cầu đặt phòng thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
        history.push('/')
      } catch (error: any) {
        toast({
          title: 'Sai định dạng dữ liệu',
          description: error?.response?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    } else {
      console.log(startDate)
      console.log(endDate)
      toast({
        title: 'Ngày kết thúc cần lớn hơn ngày bắt đầu',
        description: 'Vui lòng điền lại ngày kết thúc',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  useEffect(() => {
    axios
      .get(`/rooms/${params?.room_id}`)
      .then((res) => {
        setDetails(res.data.data.room)
        setIsBookmarked(res.data.data.is_bookmarked)
        setReviews(res.data.data.reviews)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const backToScreen = () => {
    window.location.hostname = 'localhost'
  }

  const navLabels = [
    { label: 'Tổng quan', to: 'overview' },
    { label: 'Tiện nghi', to: 'amenities' },
    { label: 'Đánh giá', to: 'reviews' },
    { label: 'Nội quy', to: 'policies' },
    { label: 'Vị trí', to: 'location' },
  ]

  return (
    <Box>
      <Nav
        padding='1.5rem 0'
        display={showStickyNavBar ? 'flex' : 'none'}
        position='sticky'
        backgroundColor='white'
        zIndex={10}
        top={0}
        left={0}
        borderTop='1px solid rgb(230, 230, 230)'
        borderBottom='1px solid rgb(230, 230, 230)'
        boxShadow='0 3px 5px 0 rgba(0,0,0,.07), 0 1px 0 0 rgba(0,0,0,.05)'
        fontSize='lg'
        transition='transform .2s'>
        <Container
          maxW='calc(1100px + 5.6rem)'
          centerContent
          flexDirection='row'
          display='flex'
          justifyContent='space-between'>
          <Box ref={initialRef}>
            {navLabels.map(({ label, to }) => (
              <NavItem
                key={to}
                activeClass='nav-item-sticky-active'
                sx={{
                  marginRight: '18px',
                  padding: '1.8125rem',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  transition: 'all .2s',
                  ':hover': {
                    cursor: 'pointer',
                    color: '#f65e39',
                  },
                }}
                to={to}
                spy
                smooth
                duration={200}
                offset={-182}>
                {label}
              </NavItem>
            ))}
          </Box>
          <Box paddingRight='1.7rem'>
            <Box padding='1.5rem 0' />
          </Box>
        </Container>
      </Nav>
      <ImageSlider
        // slide={placeData?.overviews_attributes}
        slide={details?.images}
      />
      <Box>
        <Container
          padding='0 2.8rem'
          centerContent
          maxW='calc(1100px + 5.6rem)'>
          <Box width='100%'>
            <Flex width='100%' flexDirection='row'>
              <Box flex='2'>
                <Box paddingRight='50px'>
                  <PlaceRoute city={details?.city} />
                  <PlaceIntro
                    name={details?.name}
                    address={details?.address}
                    roomData={details?.area}
                    bathRoomType={details?.bathroomType}
                    kitchenType={details?.kitchenType}
                    details={details?.description}
                    placeType={details?.roomType}
                    maxNumOfPeople='2'
                    ownerName={details?.owner?.name}
                    description={details?.description}
                  />
                  <Amenities listAmenties={details} />
                  {/* <Price /> */}
                  <Reviews roomId={details?._id} reviews={reviews} />
                  <PolicyAndRule rule={details?.rule} />
                </Box>
              </Box>
              <Box padding='1.5rem 0' flex='2'>
                <Flex width='100%' flexDirection='row'>
                  <Box ml='16px'>
                    <Button colorScheme='orange' onClick={onOpen}>
                      Đặt phòng
                    </Button>
                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                      z-index='1'>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Đặt phòng</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl mt={4}>
                            <FormLabel>Số tiền cần đặt cọc</FormLabel>
                            <Input
                              isDisabled={inputDisable}
                              placeholder='6000'
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Thời gian thuê</FormLabel>
                            <DatePicker
                              // defaultValue={dayjs(date).format('YYYY-MM-DD')}
                              format='YYYY/MM/DD'
                              onSelect={(event: any) => {
                                setStartDate(
                                  dayjs(event._d).format('YYYY/MM/DD')
                                )
                              }}
                              id='startDate'
                            />
                            <text> ~ </text>
                            <DatePicker
                              // defaultValue={dayjs(date, 'YYYY/MM/DD')}
                              format='YYYY/MM/DD'
                              onSelect={(event: any) => {
                                setEndDate(dayjs(event._d).format('YYYY/MM/DD'))
                              }}
                              id='endDate'
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme='orange'
                            mb='15px'
                            mr='20px'
                            onClick={() => next()}>
                            Thanh toán sau
                          </Button>
                          <Button colorScheme='orange' mr='50px' mb='15px'>
                            Thanh toán ngay
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                  <Box ml='5px'>
                    {token ? (
                      <ShareAndLikeBtn
                        roomId={details?._id}
                        isBookmarked={isBookmarked}
                      />
                    ) : null}
                  </Box>
                </Flex>
                <Box>
                  <BookingForm
                    roomPrice={details?.roomPrice}
                    waterPrice={details?.waterPrice}
                    electricityPrice={details?.electricityPrice}
                  />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default PlaceDetailsComponent
