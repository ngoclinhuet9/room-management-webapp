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
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'utils/axios'

type Intro = {
  _id: string
  name: string
  identity: string
  email: string
  role: string
  phone: string
  address: string
}
const EditAccount = () => {
  // const [session, loading] = useSession()
  const isEnable = true
  const [isView, setIsView] = useState(true)
  const [details, setDetails] = useState<Intro>()
  const history = useHistory()
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
  })

  const setView = () => {
    if(isView === true)
      setIsView(false)
    else
      setIsView(true)
  }

  const handleEdit = async () => {
    try{
    const res = await axios({
      url: `/renters/update`,
      method: 'put',
      data: {...details},
    })
    if (res) {
      toast({
        title: 'Thành công',
        description:
          'Update thông tin thành công',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      history.push(`/renter/account`)
    }}
    catch (error: any) {
      console.log(error)
      toast({
        title: 'Update data không thành công',
        description: error?.response?.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Box flexBasis='66.67%' pl={8}>
      <Box animation='fadeIn .4s ease-in-out'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Avatar size='xl' />
          {isView ? (
                      <Button colorScheme='orange' onClick={setView}>Edit</Button>
                    ) : 
                    (<Box>
                      <Button colorScheme='orange' ml='5px'>Edit</Button>
                      <Button colorScheme='gray' ml='5px' onClick={setView}>Cancel</Button>
                    </Box>)
                    }
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Tên
          </Text>
          <Input
            //backgroundColor='rgba(0,0,0,.07)!important'
            borderRadius='5px !important'
            boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            isDisabled = {isView}
            defaultValue={details?.name}
            onChange = {(event: any) => {
              //setDetails({name:event.target.value})
              //setDetails(prev => ({...prev, name:event.target.value}))
              console.log(details);
              
            }}
          />
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Email
          </Text>
          <Input
            //backgroundColor='rgba(0,0,0,.07)!important'
            borderRadius='5px !important'
            boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            defaultValue={details?.email}
            isDisabled ={isEnable}
          />
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Số điện thoại
          </Text>
          <InputGroup>
            <InputLeftAddon
              children='+84'
              //backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
            />
            <Input
              //backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              isDisabled = {isView}
              defaultValue={details?.phone}
              type='phone'
            />
          </InputGroup>
          {/* <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Địa chỉ
            </Text>
            <Input
              //backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              isDisabled = {isView}
            />
          </Box>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Ngày sinh
            </Text>
          </Box> */}
          {/* <Box mt={6}>
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  )
}

export default EditAccount
