
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box, Heading, Wrap, WrapItem, Text, chakra, Image } from '@chakra-ui/react'
import { ElementType } from 'react'
import { Element } from 'react-scroll'
import WashingIcon from 'assets/svg/washingmachine.svg'
import Balcony from 'assets/svg/balcony.svg'
import Fridge from 'assets/svg/fridge.svg'
import Sofa from 'assets/svg/sofa.svg'
import MicrowaveIcon from 'assets/svg/microwave.svg'
import Conditioner from 'assets/svg/air-conditioner.svg'

const Amenities = ({ listAmenties }: any) => {
  const NavLabel = chakra(Element)

  const amenties: any = {
    'Fridge/ Freezer': 'Tủ lạnh',
    Sofa: 'Sofa',
    'Washing machine': 'Máy giặt',
    Balcony: 'Ban công',
    Microwave: 'Lò vi sóng',
    Conditioner: 'Điều hòa'
  }
  const icon = (title: string, exist: boolean) => {
    if (exist) return amentyIcons[title]
  }

  const amentyIcons: any = {
    'Fridge/ Freezer':
      <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
        <Image src={Fridge} width='24px' height='24px' />
        <span style={{ marginLeft: '.875rem' }}>{amenties['Fridge/ Freezer']}</span>
      </WrapItem>,
    Sofa:
      <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
        <Image src={Sofa} width='24px' height='24px' />
        <span style={{ marginLeft: '.875rem' }}>{amenties.Sofa}</span>
      </WrapItem>,
    'Washing machine':
      <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
        <Image src={WashingIcon} width='24px' height='24px' />
        <span style={{ marginLeft: '.875rem' }}>{amenties['Washing machine']}</span>
      </WrapItem>,
    Balcony:
      <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
        <Image src={Balcony} width='24px' height='24px' />
        <span style={{ marginLeft: '.875rem' }}>{amenties.Balcony}</span>
      </WrapItem>,
    Microwave:
      <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
        <Image src={MicrowaveIcon} width='24px' height='24px' />
        <span style={{ marginLeft: '.875rem' }}>{amenties.Microwave}</span>
      </WrapItem>,
    Conditioner:
    <WrapItem alignItems='center' lineHeight='taller' mt={3} width='31.333%' >
      <Image src={Conditioner} width='24px' height='24px' />
      <span style={{ marginLeft: '.875rem' }}>{amenties.Conditioner}</span>
    </WrapItem>,

  }

  return (
    <NavLabel className='place-details-amenities' name='amenities' mt={20}>
      <Box className='title'>
        <Heading as='h3' fontSize='3xl' fontWeight='bolder' lineHeight='shorter'>
          Tiện nghi chỗ ở
        </Heading>
        <Text mt={5}>Giới thiệu về các tiện nghi và dịch vụ tại nơi lưu trú</Text>
      </Box>
      <Box className='facilities'>
        <Heading mt={6} fontSize='xl'>
          Tiện ích
        </Heading>
        <Wrap align='center' color='#555' width='100%'>
          {icon('Fridge/ Freezer', listAmenties?.hasFridge)}
          {icon('Sofa', listAmenties?.hasWaterHeater)}
          {icon('Washing machine', listAmenties?.hasWardrobe)}
          {icon('Balcony', listAmenties?.hasBalcony)}
          {icon('Microwave', listAmenties?.hasBed)}
          {icon('Conditioner', listAmenties?.hasConditioner)}
        </Wrap>
      </Box>
    </NavLabel>
  )
}

export default Amenities
