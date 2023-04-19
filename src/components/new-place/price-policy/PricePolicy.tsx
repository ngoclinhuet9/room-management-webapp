/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  Text,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import InfoBox from '../InfoBox'

const PricePolicy = ({ completeStep, syncData, data }: { completeStep: Function; syncData: Function; data: any }) => {
  const [roomPrice, setRoomPrice] = useState(data.roomPrice)
  const [waterPrice, setWaterPrice] = useState(data.waterPrice)
  const [electricityPrice, setElectricityPrice] = useState(data.electricityPrice)

  useEffect(() => {
    if (data) {
      setRoomPrice(data.roomPrice)
      setWaterPrice(data.waterPrice)
      setElectricityPrice(data.electricityPrice)
    }
  }, [data])
  useEffect(() => {
    completeStep(true)
    syncData({
      roomPrice,
      waterPrice,
      electricityPrice
    })
  }, [electricityPrice, completeStep, roomPrice, syncData, waterPrice])

  return (
    <Box mt={10} pb={10}>
      <Flex mb={5}>
        <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
          <Box>
            <Text fontSize='xl' fontWeight='bold'>
              Thiết lập giá và chính sách
            </Text>
            <Text color='gray.500' fontSize='md'>
              Doanh thu của chủ nhà phụ thuộc trực tiếp vào việc thiết lập giá cùng các quy định về số khách, số đêm và
              chính sách hủy phòng.
            </Text>
          </Box>
        </Box>
      </Flex>

      <Flex mb={5}>
        <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
          <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
            <Text fontSize='xl' fontWeight='bold'>
              Chính sách giá
            </Text>
          </Box>
          <FormControl id='normal_day_price' isRequired mb={5} mr={5}>
            <FormLabel>Giá phòng 1 tháng: </FormLabel>
            <NumberInput step={500000} defaultValue={1000000} min={0} max={100000000} onChange={(value) => setRoomPrice(parseInt(value))} value={roomPrice}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id='weekend_price' isRequired mb={5} mr={5}>
            <FormLabel>Giá điện trên 1 kWh: </FormLabel>
            <NumberInput step={500} defaultValue={5000} min={0} max={1000000} onChange={(value) => setElectricityPrice(parseInt(value))} value={electricityPrice}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl id='cleaning_price' isRequired mb={5} mr={5}>
            <FormLabel>Giá nước trên 1 m3: </FormLabel>
            <NumberInput step={1000} defaultValue={5000} min={0} max={10000000} onChange={(value) => setWaterPrice(parseInt(value))} value={waterPrice}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>

        <Spacer />
        <Box w='35%'>
          <InfoBox
            title='Đặt giá cơ bản sao cho đúng?'
            content=' Giá cơ bản là mức giá hiển thị tại chỗ nghỉ trong kết quả tìm kiếm, chiếm đến 70% quyết định click vào chỗ nghỉ của khách hàng'
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default PricePolicy
