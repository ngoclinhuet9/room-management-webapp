/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Box,
  Flex,
  Spacer,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Text,
} from '@chakra-ui/react'
import axios from 'utils/axios'
import { auth } from 'firebase-config'
import useRedux from 'hooks/useRedux'
import actions from 'store/actions'

import { HamburgerIcon, ChevronDownIcon, EmailIcon } from '@chakra-ui/icons'
import Logo from 'assets/logo2.png'
import Notifi from './Notifi'

export default function Header({hasToVerify = true}: {hasToVerify?: Boolean}) {
  const toast = useToast()
  const history = useHistory()
  const { dispatch } = useRedux()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [name, setName] = useState('')

  useEffect(() => {
    if (hasToVerify) {
      axios.get('/profile').then((result) => {
        const { data } = result.data
        if(data.role === 'owner'){
          setName(data.name)
        }
        if(data.role === 'admin'){
          toast({
            title: 'Có sự cố xảy ra',
            description: 'Bạn không có quyền truy cập trang này',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          history.push('/admin')
        }
        if(data.role === 'renter'){
          toast({
            title: 'Có sự cố xảy ra',
            description: 'Bạn không có quyền truy cập trang này',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          history.push('/admin')
        }
      }).catch((error) => {
        if (error.response?.status === 403 || 401) {
          signOut()
          toast({
            title: 'Có sự cố xảy ra',
            description: 'Bạn không đủ quyền để truy cập trang này',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      })
    }

    axios.put('/updatetoken')
    .catch((err: any) => {
      console.log(err)
      toast({
        title: 'Có sự cố xảy ra',
        description: 'Bạn không đủ quyền để truy cập trang này',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    })
  // })
}, [])
  const signOut = async () => {
    await auth.signOut()
    setName('')
    dispatch(
      actions.signOut()
    )
    localStorage.clear()
    history.push('/')
  }

  return (
    <div>
      <Box
        display={{
          md: 'block',
          lg: 'none',
          xl: 'none',
        }}
        mt={2}
        pb={2}
        borderBottom='1px solid #E2E8F0'
        alignItems='center'>
        <Flex
          display='flex'
          paddingRight='2.5rem'
          paddingLeft='2.5rem'
          alignItems='center'>
          <Box />
          <Spacer />
          <Button onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
            <DrawerBody>
              <Button variant='ghost'>
                <Link to='/login'>Đăng nhập</Link>
              </Button>
              <Button variant='ghost'>
                <Link to='/signup'>Đăng ký</Link>
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Box
        height='85px'
        w='100%'
        mb={5}
        pb={3}
        display={{ sm: 'none', md: 'none', lg: 'block' }}
        borderBottom='1px solid rgb(226 232 240)'>
        <Flex
          display='flex'
          w='75%'
          height='100%'
          m='0 auto'
          alignItems='center'>
          <Box width='100%'>
            <Link to='/owner'>
              <Image display='inline' src={Logo} width='16%' height='22%' mt='10px' />
            </Link>
          </Box>
          <Spacer />
          {name !== '' ? (
            <>
              {/* <Menu>
                <MenuButton
                  px={8}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md">
                  <EmailIcon />
                </MenuButton>
                <MenuList w='350px'>
                  <Notifi role='owner' />
                </MenuList>
              </Menu> */}
              <Menu>
                <MenuButton width='18w%' as={Button} rightIcon={<ChevronDownIcon />}>
                  {name}
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to='/owner/account'>Cài đặt tài khoản</Link>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={signOut} variant='link'>
                      Đăng xuất
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>

            </>
          ) : (
              <Flex display='flex' alignItems='center'>
                <Button variant='ghost'>
                  <Link to='/login'>Đăng nhập</Link>
                </Button>
                <Button variant='ghost'>
                  <Link to='/signup'>Đăng ký</Link>
                </Button>
              </Flex>
            )}
        </Flex>
      </Box>
    </div>
  )
}
