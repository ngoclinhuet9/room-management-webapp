import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'

const cities = {
  hanoi: 'Hà Nội',
  hcm: 'Hồ Chí Minh',
  nhatrang: 'Nha Trang',
  dalat: 'Đà Lạt',
  danang: 'Đà Nẵng',
  vungtau: 'Vũng Tàu',
  hoian: 'Hội An',
  quangninh: 'Quảng Ninh',
} as any
const PlaceRoute = ({ city }: any) => {
  const [pathname, setPathname] = useState('/')
  useEffect(() => {
    if(window.location.pathname.startsWith('/admin')){
      setPathname('/admin')
    }
    if(window.location.pathname.startsWith('/owner')){
      setPathname('/owner')
    }
  })
  return (
  <Box>
    <Breadcrumb
      padding='1.5rem 0'
      spacing='8px'
      separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href={pathname}>Trang chủ</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href='#'>Việt Nam</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/cities/${city}`}>{cities[city]}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  </Box>
)}

export default PlaceRoute
