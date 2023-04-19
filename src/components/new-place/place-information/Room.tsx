/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Spacer,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Room = ({
  completeTab,
  syncAmount,
  syncBathroomType,
  syncKitchen,
  syncIsWithOwner,
  data,
}: {
  completeTab: Function
  syncAmount: Function
  syncBathroomType: Function
  syncKitchen: Function
  syncIsWithOwner: Function
  data: any
}) => {
  const [amount, setAmount] = useState(data.amount)
  const [bathroomType, setBathroomType] = useState(data.bathroomType)
  const [kitchenType, setKitchenType] = useState(data.kitchenType)
  const [isWithOwner, setIsWithOwner] = useState(data.isWithOwner)
  useEffect(() => {
    if (data) {
      setAmount(data.amount)
      setBathroomType(data.bathroomType)
      setKitchenType(data.kitchenType)
      setIsWithOwner(data.isWithOwner)
    }
  }, [data])
  useEffect(() => {
    if (bathroomType === '' || kitchenType === '' || amount === 0) {
      completeTab(false)
    } else {
      syncAmount(amount)
      syncBathroomType(bathroomType)
      syncKitchen(kitchenType)
      syncIsWithOwner(isWithOwner)
      completeTab(true)
    }
  }, [
    amount,
    bathroomType,
    completeTab,
    isWithOwner,
    kitchenType,
    syncAmount,
    syncBathroomType,
    syncIsWithOwner,
    syncKitchen,
  ])

  return (
    <Flex>
      <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
        <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
          <Text fontSize='xl' fontWeight='bold'>
            Phòng của bạn
          </Text>
        </Box>
        <FormControl id='square' isRequired mb={5}>
          <FormLabel>Tiền cọc: </FormLabel>
          <NumberInput
            step={500000}
            defaultValue={2000000}
            min={10}
            max={10000000}
            onChange={(value) => setAmount(parseInt(value))}
            value={amount}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id='num-of-bedroom' isRequired mb={5} mr={5}>
          <FormLabel>Phòng tắm: </FormLabel>
          <Select
            placeholder='Chọn loại phòng tắm'
            onChange={(event) => setBathroomType(event.target.value)}
            value={bathroomType}>
            <option value='PRIVATE'>Riêng</option>
            <option value='SHARED'>Chung</option>
          </Select>
        </FormControl>
        <FormControl id='num-of-bed' isRequired mb={5}>
          <FormLabel>Nhà bếp: </FormLabel>
          <Select
            placeholder='Chọn loại nhà bếp'
            onChange={(event) => setKitchenType(event.target.value)}
            value={kitchenType}>
            <option value='PRIVATE'>Riêng</option>
            <option value='SHARED'>Chung</option>
            <option value='NONE'>Không có</option>
          </Select>
        </FormControl>
        <FormControl id='smoking' isRequired mb={5}>
          <FormLabel>Chung chủ</FormLabel>
          <RadioGroup
            defaultValue='allowed'
            onChange={(value: string) => {
              setIsWithOwner(value === 'allowed')
            }}
            value={isWithOwner ? 'allowed' : 'unallowed'}>
            <Stack direction='row'>
              <Radio value='allowed' colorScheme='orange' w='50%'>
                Chung chủ
              </Radio>
              <Radio value='unallowed' colorScheme='orange'>
                Không chung chủ
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      <Spacer />
    </Flex>
  )
}

export default Room
