import { Container, Box, Flex, chakra, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import axios from 'utils/axios'
import { useParams } from 'react-router-dom'
import Amenities from 'components/place/place-details/Amenities'
import ImageSlider from 'components/place/place-details/ImageSlider'
import Location from 'components/place/place-details/Location'
import PlaceIntro from 'components/place/place-details/PlaceIntro'
import PlaceRoute from 'components/place/place-details/PlaceRoute'
import PolicyAndRule from 'components/place/place-details/PolicyAndRule'
import BookingForm from 'components/place/place-details/BookingForm'
import Reviews from 'components/place/place-details/Reviews'
import Layout from 'layouts/OwnerLayout'
import Action from './Action'

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
  user: { name: string }
  rule: string
  city: string
}
type Params = {
  room_id: string
}

const ViewRoom = () => {
  const token = localStorage.getItem('token')
  const toast = useToast()
  const params: Params = useParams()
  const Nav = chakra('nav')
  const NavItem = chakra(Link)

  const [showStickyNavBar, setShowStickyNavBar] = useState(false)
  const [details, setDetails] = useState<Intro>()
  const [isBookmarked, setIsBookmarked] = useState(true)
  const [reviews, setReviews] = useState([])
  const handleScroll = () => {
    const position = window.pageYOffset
    if (position >= 650) {
      setShowStickyNavBar(true)
    } else {
      setShowStickyNavBar(false)
    }
  }
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

  const navLabels = [
    { label: 'Tổng quan', to: 'overview' },
    { label: 'Tiện nghi', to: 'amenities' },
    { label: 'Nội quy', to: 'policies' },
    { label: 'Đánh giá', to: 'reviews' },
  ]

  return (
    <Layout title={details?.name}>
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
          <Box>
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
                    ownerName={details?.user?.name}
                    description={details?.description}
                  />
                  <Amenities listAmenties={details} />
                  <PolicyAndRule rule={details?.rule} />
                  <Reviews roomId={details?._id} reviews={reviews} />
                </Box>
              </Box>
              <Box flex='1'>
                {token ? <Action /> : null}

                <BookingForm
                  roomPrice={details?.roomPrice}
                  waterPrice={details?.waterPrice}
                  electricityPrice={details?.electricityPrice}
                />
              </Box>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default ViewRoom
