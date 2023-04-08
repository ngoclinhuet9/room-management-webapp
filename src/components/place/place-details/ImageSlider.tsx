/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Image } from '@chakra-ui/react'
import Silder from 'react-slick'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'

const ImageSlider = ({ slide }: any) => {
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }
  return (
    <Box width='100%'>
      <Silder {...settings}>
        {slide?.map((image: string) => (
          <Box key={image}>
            <Image
              height='400px'
              width='100%'
              fallbackSrc='https://www.luxstay.com/loading-img.svg'
              src={image}
            />
          </Box>
        ))}
      </Silder>
    </Box>
  )
}

export default ImageSlider
