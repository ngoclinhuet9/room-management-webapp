/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
import { Box, Text, Flex, Checkbox } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Facility = ({
  completeTab,
  syncWaterHeater,
  syncConditioner,
  syncBalcony,
  syncFridge,
  syncBed,
  syncWardrobe,
  data,
}: {
  completeTab: Function
  syncWaterHeater: Function
  syncConditioner: Function
  syncBalcony: Function
  syncFridge: Function
  syncBed: Function
  syncWardrobe: Function
  data: any
}) => {
  const [hasWaterHeater, setHasWaterHeater] = useState(data.hasWaterHeater)
  const [hasConditioner, setHasConditioner] = useState(data.hasConditioner)
  const [hasBalcony, setHasBalcony] = useState(data.hasBalcony)
  const [hasFridge, setHasFridge] = useState(data.hasFridge)
  const [hasBed, setHasBed] = useState(data.hasBed)
  const [hasWardrobe, setHasWardrobe] = useState(data.hasWardrobe)
  useEffect(() => {
    if (data) {
      setHasWaterHeater(data.hasWaterHeater)
      setHasConditioner(data.hasConditioner)
      setHasBalcony(data.hasBalcony)
      setHasFridge(data.hasFridge)
      setHasBed(data.hasBed)
      setHasWardrobe(data.hasWardrobe)
    }
  }, [data])

  useEffect(() => {
    syncWaterHeater(hasWaterHeater)
    syncConditioner(hasConditioner)
    syncBalcony(hasBalcony)
    syncFridge(hasFridge)
    syncBed(hasBed)
    syncWardrobe(hasWardrobe)
    completeTab(true)
  }, [
    completeTab,
    hasBalcony,
    hasBed,
    hasConditioner,
    hasFridge,
    hasWardrobe,
    hasWaterHeater,
    syncBalcony,
    syncBed,
    syncConditioner,
    syncFridge,
    syncWardrobe,
    syncWaterHeater,
  ])

  return (
    <Flex>
      <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
        <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
          <Text fontSize='xl' fontWeight='bold'>
            Tiện nghi
          </Text>
          <Text color='gray.500' fontSize='md'>
            Rất nhiều khách hàng đã tìm kiếm chỗ nghỉ dựa trên các tiêu chí về
            tiện nghi.
          </Text>
        </Box>
        <Flex>
          <Flex direction='column' w='50%'>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasWaterHeater(event.target.checked)
              }}
              isChecked={hasWaterHeater}>
              Bình nóng lạnh
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasConditioner(event.target.checked)
              }}
              isChecked={hasConditioner}>
              Điều hoà
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasBalcony(event.target.checked)
              }}
              isChecked={hasBalcony}>
              Ban công
            </Checkbox>
          </Flex>
          <Flex direction='column'>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasFridge(event.target.checked)
              }}
              isChecked={hasFridge}>
              Tủ lạnh
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasBed(event.target.checked)
              }}
              isChecked={hasBed}>
              Giường
            </Checkbox>
            <Checkbox
              size='md'
              colorScheme='orange'
              mb={3}
              onChange={(event) => {
                setHasWardrobe(event.target.checked)
              }}
              isChecked={hasWardrobe}>
              Tủ quần áo
            </Checkbox>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Facility
