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
  Text
} from '@chakra-ui/react'
import axios from 'utils/axios'
import { auth } from 'firebase-config'
import useRedux from 'hooks/useRedux'
import actions from 'store/actions'


import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Logo from 'assets/logo2.png'

export default function Header() {
  const toast = useToast()
  const history = useHistory()
  const { dispatch, selector } = useRedux()
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [urlHeader, setUrlHeader] = useState('/')
  const isAuth = localStorage.getItem('infoUser')

  useEffect(() => {
    if (isAuth) {
      setName(JSON.parse(localStorage.getItem('infoUser') as string).name)
      setRole(JSON.parse(localStorage.getItem('infoUser') as string).role)
      console.log(JSON.parse(localStorage.getItem('infoUser') as string).name, role,'infor');
       }
    else{
      if(window.location.pathname.startsWith('/owner') || window.location.pathname.startsWith('/admin')){
                toast({
                  title: 'Có sự cố xảy ra:',
                  description: 'Bạn không đủ quyền để truy cập trang này',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position: 'top',
                })
                history.push('/')
              }
    }
    // auth.onAuthStateChanged(async () => {
    // try {
    //   setIsLoading(true)
    //   axios.get('/profile').then((result) => {
    //     const { data } = result.data
    //     // localStorage.setItem('infoUser', JSON.stringify(data))
    //     setName(data.name)
    //     setRole(data.role)
    //     setIsLoading(false)
    //     if(role === 'renter'){
    //       setUrlHeader('/')
    //       if(window.location.pathname.startsWith('/owner') || window.location.pathname.startsWith('/admin')){
    //         toast({
    //           title: 'Có sự cố xảy ra:',
    //           description: 'Bạn không đủ quyền để truy cập trang này',
    //           status: 'error',
    //           duration: 3000,
    //           isClosable: true,
    //           position: 'top',
    //         })
    //         history.push('/')
    //       }
    //     }
    //     if(role === 'owner'){
    //       setUrlHeader('/owner')
    //       if(window.location.pathname.startsWith('/admin')){
    //         toast({
    //           title: 'Có sự cố xảy ra:',
    //           description: 'Bạn không đủ quyền để truy cập trang này',
    //           status: 'error',
    //           duration: 3000,
    //           isClosable: true,
    //           position: 'top',
    //         })
    //         history.push('/owner')
    //       }
    //     }
    //     if(role === 'admin'){
    //       setUrlHeader('/admin')
    //       if(window.location.pathname.startsWith('/owner')){
    //         toast({
    //           title: 'Có sự cố xảy ra:',
    //           description: 'Bạn không đủ quyền để truy cập trang này',
    //           status: 'error',
    //           duration: 3000,
    //           isClosable: true,
    //           position: 'top',
    //         })
    //         history.push('/admin')
    //       }
    //     }
    //   })
    // } catch (error: any) {
    //   if (error.response.status === 403) {
    //     signOut()
    //     toast({
    //       title: 'Có sự cố xảy ra',
    //       description: 'Bạn không đủ quyền để truy cập trang này',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //       position: 'top',
    //     })
    //   }
    // }
    // })
    axios.put('/updatetoken')
    .catch((err: any) => {
      console.log(err)
    })
  }, [isAuth])
  useEffect(() => {
      if(role === 'renter'){
        console.log(role, 'check role');
        setUrlHeader('/')
        if(window.location.pathname.startsWith('/owner') || window.location.pathname.startsWith('/admin')){
          toast({
            title: 'Có sự cố xảy ra:',
            description: 'Bạn không đủ quyền để truy cập trang này',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          history.push('/')
        }
        if(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')){
          history.push('/')
        }
      }
    if(role === 'owner'){
      console.log(role, 'check owner');
      setUrlHeader('/owner')
      if(window.location.pathname.startsWith('/admin')){
        toast({
          title: 'Có sự cố xảy ra:',
          description: 'Bạn không đủ quyền để truy cập trang này',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        history.push('/owner')
      }
      if(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')){
        history.push('/owner')
      }
    }
    if(role === 'admin'){
      console.log(role, 'check admin');
      setUrlHeader('/admin')
      if(window.location.pathname.startsWith('/owner')){
        toast({
          title: 'Có sự cố xảy ra:',
          description: 'Bạn không đủ quyền để truy cập trang này',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        history.push('/admin')
      }
      if(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')){
        history.push('/admin')
      }
    }
  },[role])

  const signOut = async () => {
    await auth.signOut()
    setName('')
    dispatch(
      actions.signOut()
    )
    localStorage.clear()
    history.push('/')
    setIsLoading(false)
  }

  const redirectToOwner = () => {
    history.push('/login')
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
              <Button >
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
          <Link to={urlHeader}>
            <Image display='inline' src={Logo} width='20%' height='25%' mt='10px'/>
          </Link>
          <Spacer />
          {isAuth ? (
            <>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {name}
                </MenuButton>
                {(role === 'renter') && (
                <MenuList zIndex='3'>
                  <MenuItem>
                    <Link to='/renter/account'>Cài đặt tài khoản</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/renter/bookmarks'>Yêu thích</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/renter/renting'>Danh sách phòng đang thuê</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to='/renter/histories'>Lịch sử đặt phòng</Link>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={signOut} variant='link'>
                      Đăng xuất
                  </Button>
                  </MenuItem>
                </MenuList>)}
                {(role === 'owner') && (
                <MenuList zIndex='3'>
                <MenuItem>
                  <Link to='/owner/account'>Cài đặt tài khoản</Link>
                </MenuItem>
                <MenuItem>
                  <Button onClick={signOut} variant='link'>
                    Đăng xuất
                  </Button>
                </MenuItem>
              </MenuList>)}
                {(role === 'admin') && (
                <MenuList zIndex='3'>
                <MenuItem>
                    <Button onClick={() => history.push('/admin/account')} variant='link'>
                      Cài đặt tài khoản
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={() => history.push('/admin/dashboard')} variant='link'>
                      Thống kê
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={signOut} variant='link'>
                      Đăng xuất
                    </Button>
                  </MenuItem>
                </MenuList>)}
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
