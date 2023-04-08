/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Rule = ({
  completeTab,
  syncRule,
  data,
}: {
  completeTab: Function
  syncRule: Function
  data: any
}) => {
  const [rule, setRule] = useState(data.rule)
  useEffect(() => {
    if (data) {
      setRule(data.rule)
    }
  }, [data])

  useEffect(() => {
    syncRule(rule)
    completeTab(true)
  }, [completeTab, rule, syncRule])

  return (
    <Flex>
      <Box border='1px' borderColor='gray.200' borderRadius='md' p={5} w='60%'>
        <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
          <Text fontSize='xl' fontWeight='bold'>
            Thiết lập nội quy chỗ nghỉ
          </Text>
        </Box>
        <FormControl id='special-rule' mb={5}>
          <FormLabel>Nội quy</FormLabel>
          <Textarea
            placeholder='Nội quy đặc biệt'
            onChange={(event) => {
              setRule(event.target.value)
            }}
            value={rule}
          />
        </FormControl>
      </Box>
    </Flex>
  )
}

export default Rule
