/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  Select,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import InfoBox from '../InfoBox'

const BaseInformation = ({
  completeTab,
  syncPlaceName,
  syncPlaceType,
  data,
}: {
  completeTab: Function
  syncPlaceName: Function
  syncPlaceType: Function
  data: any
}) => {
  const [placeName, setPlaceName] = useState(data.name)
  const [roomType, setRoomType] = useState(data.roomType)
  const [roomQuantity, setRoomQuantity] = useState(data.roomQuantity)
  useEffect(() => {
    if (data) {
      setPlaceName(data.name)
      setRoomType(data.roomType)
    }
  }, [data])

  useEffect(() => {
    if (placeName === '' || roomType === '' || placeName?.length < 6) {
      completeTab(false)
    } else {
      syncPlaceName(placeName)
      syncPlaceType(roomType)
      completeTab(true)
    }
  }, [placeName, completeTab, syncPlaceName, syncPlaceType, roomType])

  return (
    <Flex>
      <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
        <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
          <Text fontSize='xl' fontWeight='bold'>
            Phân loại chỗ nghỉ
          </Text>
          <Text color='gray.500' fontSize='md'>
            Trước hết, hãy cho chúng tôi biết, chỗ nghỉ của bạn thuộc loại hình
            nào.
          </Text>
        </Box>
        <FormControl id='place_type' isRequired mb={5}>
          <FormLabel>Chỗ nghỉ của bạn là:</FormLabel>
          <Select
            placeholder='Chọn loại chỗ nghỉ'
            onChange={(event) => setRoomType(event.target.value)}
            value={roomType}>
            <option value='MOTEL'>Phòng trọ</option>
            <option value='APARTMENT'>Chung cư</option>
            <option value='WHOLE_HOUSE'>Nhà nguyên căn</option>
            <option value='WHOLE_APARTMENT'>Chung cư nguyên căn</option>
          </Select>
        </FormControl>
        <InfoBox
          title='Homestay'
          content=' Không gian lưu trú nơi các vị khách được sinh hoạt trong những ngôi nhà dân theo phong cách sống bản địa.'
        />
        <FormControl id='roomQuantity' isRequired mb={5}>
          <FormLabel>Diện tích chỗ nghỉ của bạn là: </FormLabel>
          <NumberInput
            step={1}
            defaultValue={15}
            min={1}
            max={500}
            onChange={(value) => setRoomQuantity(parseInt(value))}
            value={roomQuantity}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id='place_name' isRequired mb={5}>
          <FormLabel>Tên chỗ nghỉ (Ít nhất 6 ký tự)</FormLabel>
          <Input
            placeholder='Tên chỗ nghỉ '
            value={placeName}
            onChange={(event) => {
              setPlaceName(event.target.value)
            }}
          />
        </FormControl>
      </Box>
      <Spacer />
      <Box w='35%'>
        <InfoBox
          title='Tại sao cần phân loại chỗ nghỉ?'
          content='Chúng tôi phân chỗ nghỉ thành 29 loại, việc này giúp cho khách hàng lựa chọn nơi ở dễ dàng hơn. Đồng thời Luxstay cũng có điều kiện hỗ trợ bạn tốt hơn.'
        />
      </Box>
    </Flex>
  )
}

export default BaseInformation
