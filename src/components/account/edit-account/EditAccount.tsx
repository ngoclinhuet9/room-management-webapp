/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Button,
  Input,
  Text,
  InputLeftAddon,
  InputGroup,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Intro = {
  _id: string
  name: string
  email: string
}
const EditAccount = () => {
  // const [session, loading] = useSession()
  const [details, setDetails] = useState<Intro>()
  const toast = useToast()
  useEffect(() => {
    axios
      .get(`/profile`)
      .then((res) => {
        setDetails(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Box flexBasis='66.67%' pl={8}>
      <Box animation='fadeIn .4s ease-in-out'>
        <Box display='flex' alignItems='center'>
          <Avatar size='xl' />
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Tên
          </Text>
          <Input
            backgroundColor='rgba(0,0,0,.07)!important'
            borderRadius='5px !important'
            boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            variant='filled'
            placeholder={details?.name}
          />
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Email
          </Text>
          <Input
            backgroundColor='rgba(0,0,0,.07)!important'
            borderRadius='5px !important'
            boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            variant='filled'
            placeholder={details?.email}
          />
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Số điện thoại
          </Text>
          <InputGroup>
            <InputLeftAddon
              children='+84'
              backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            />
            <Input
              backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              type='phone'
            />
          </InputGroup>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Địa chỉ
            </Text>
            <Input
              backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              variant='filled'
            />
          </Box>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Ngày sinh
            </Text>
          </Box>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Giới tính
            </Text>
            <RadioGroup
              // value={gender}
              defaultValue='male'>
              <Stack direction='row' spacing={3}>
                <Radio
                  cursor='pointer'
                  boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
                  size='lg'
                  colorScheme='orange'
                  value='male'>
                  Nam
                </Radio>
                <Radio
                  cursor='pointer'
                  boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
                  size='lg'
                  colorScheme='orange'
                  value='female'>
                  Nữ
                </Radio>
                <Radio
                  cursor='pointer'
                  boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
                  size='lg'
                  colorScheme='orange'
                  value='other'>
                  Khác
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Giới thiệu bản thân
            </Text>
            <Textarea
              backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              variant='filled'
              minH='120px'
              resize='none'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default EditAccount
