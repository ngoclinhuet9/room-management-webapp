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


const EditAccount = ({ data }: { data?: any }) => {
  // const [session, loading] = useSession()
  const isEnable = true
  const [isView, setIsView] = useState(true)
  const [name, setName] = useState('')
  const [identity, setIdentity] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const history = useHistory()
  const toast = useToast()
  useEffect(() => {
    axios
      .get(`/profile`)
      .then((res) => {
        setName(res.data.data.name)
        setIdentity(res.data.data.identity)
        setEmail(res.data.data.email)
        setPhone(res.data.data.phone)
        setAddress(res.data.data.address)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const setView = () => {
    if(isView === true)
      setIsView(false)
    else
      setIsView(true)
      axios
      .get(`/profile`)
      .then((res) => {
        setName(res.data.data.name)
        setIdentity(res.data.data.identity)
        setEmail(res.data.data.email)
        setPhone(res.data.data.phone)
        setAddress(res.data.data.address)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEdit = async () => {
    try{
    const res = await axios({
      url: `/updateuser`,
      method: 'put',
      data: {name, address, identity, phone},
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
      setIsView(true)
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
                      <Button colorScheme='orange' onClick={setView}>Chỉnh sửa</Button>
                    ) : 
                    (<Box>
                      <Button colorScheme='orange' ml='5px' onClick={handleEdit}>Hoàn thành</Button>
                      <Button colorScheme='gray' ml='5px' onClick={setView}>Hủy</Button>
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
            value={name}
            onChange = {(event: any) => {setName(event.target.value)}}
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
            defaultValue={email}
            isDisabled ={isEnable}
          />
        </Box>
        <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Chứng minh nhân dân
            </Text>
            <Input
              //backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              value={identity}
              onChange = {(event: any) => {setIdentity(event.target.value)}}
              isDisabled = {isView}
            />
          </Box>
          <Box mt={6}>
            <Text mb={2} color='#666' fontWeight='bold'>
              Địa chỉ
            </Text>
            <Input
              //backgroundColor='rgba(0,0,0,.07)!important'
              borderRadius='5px !important'
              boxShadow='inset 0 1px 2px 0 rgba(0,0,0,.15)!important'
              value={address}
              onChange = {(event: any) => {setAddress(event.target.value)}}
              isDisabled = {isView}
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
                value={phone}
                onChange = {(event: any) => {setPhone(event.target.value)}}
                type='phone'
              />
            </InputGroup>
          {/* <Box mt={6}>
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
