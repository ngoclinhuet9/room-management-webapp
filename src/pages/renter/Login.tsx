/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { EmailIcon } from '@chakra-ui/icons'
import Copyright from 'components/layout/Copyright'
import { Helmet } from 'react-helmet'
import {
  Grid,
  InputGroup,
  InputRightElement,
  Box,
  Container,
  Text,
  GridItem,
  Input,
  Button,
  Link,
  useToast,
} from '@chakra-ui/react'
import Header from 'components/layout/Header'
import { Link as ReactLink } from 'react-router-dom'
import useRedux from 'hooks/useRedux'
import actions from 'store/actions'
import MediaBox from 'components/login/MediaBox'
import Coins from 'assets/signin/coins.png'
import TopSales from 'assets/signin/top-sales.png'
import Wallet from 'assets/signin/wallet.png'
import BackPack from 'assets/signin/backpack.png'
import { isValidEmail } from 'utils/validation'

const Login = () => {
  const toast = useToast()
  const { dispatch } = useRedux()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleLogin = async () => {
    if (!email || !password) {
      return toast({
        title: 'Lỗi',
        description: 'Email hoặc mật khẩu không được để trống',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
    if (!isValidEmail(email)) {
      return toast({
        title: 'Lỗi',
        description: 'Email không hợp lệ',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
    setLoading(true)
    await dispatch(
      actions.loginByEmailAndPassword({
        email,
        password,
      })
    )
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Grid templateRows='auto 1fr auto' maxWidth='100%' minH='100vh'>
        <Header />
        <Box>
          <Box
            background='linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)'
            color='white'
            py={12}>
            <Container px={10} maxW='calc(1296px + 5.6rem)'>
              <Box px={2} maxW='60%'>
                <Box as='h1' fontSize='2xl' fontWeight='bold' mb={3}>
                  Đăng ký thành viên - Tích điểm thưởng và nhận ưu đãi
                </Box>
                <Text fontSize='lg' fontWeight='semibold'>
                  Nhanh chóng, tiện lợi và an toàn. Đăng ký liền tay, rinh ngay
                  quyền lợi.
                </Text>
              </Box>
            </Container>
          </Box>
          <Container px={10} maxW='calc(1296px + 5.6rem)' mb={14}>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
              <GridItem mt={20} colSpan={[3, 3, 3, 1, 1]}>
                <Box
                  p={8}
                  background='white'
                  boxShadow='xl'
                  mt='-6.875rem'
                  borderRadius='lg'>
                  <Box as='h3' fontSize='2xl' fontWeight='black' mb={8}>
                    Đăng nhập
                  </Box>
                  <Text fontWeight='bold' mb={4}>
                    Đăng nhập ngay để trải nghiệm
                  </Text>
                  <InputGroup mt={8} size='lg'>
                    <Input
                      type='email'
                      required
                      placeholder='Địa chỉ email'
                      borderRadius='3rem'
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      _placeholder={{ fontSize: 'md' }}
                      _focus={{
                        borderColor: 'orange.500',
                        boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                      }}
                    />
                    <InputRightElement
                      width='4.5rem'
                      pointerEvents='none'
                      children={
                        <EmailIcon h='1.5rem' w='1.5rem' color='gray.300' />
                      }
                    />
                  </InputGroup>
                  <InputGroup size='lg' mt={8}>
                    <Input
                      pr='4.5rem'
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder='Mật khẩu'
                      borderRadius='3rem'
                      _placeholder={{ fontSize: 'md' }}
                      _focus={{
                        borderColor: 'orange.500',
                        boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                      }}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={handleShowPassword}>
                        {showPassword ? 'Ẩn' : 'Hiện'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Button
                    colorScheme='orange'
                    isLoading={loading}
                    size='md'
                    mt={8}
                    w='100%'
                    borderRadius='3em'
                    boxShadow='0 4px 12px 0 rgba(246,116,57,.4)'
                    backgroundImage='linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)'
                    backgroundSize='200% auto'
                    height='3.5rem'
                    onClick={handleLogin}
                    disabled={loading}
                    _disabled={{ opacity: 0.5 }}
                    _hover={{
                      backgroundPosition: '100%',
                    }}>
                    Đăng nhập
                  </Button>
                  <Box mt={8} textAlign='center' fontWeight='bold'>
                    <Box>
                      Quên mật khẩu?{' '}
                      <Link
                        href='forgot-password'
                        color='orange.600'
                        textDecoration='none'
                        _hover={{ textDecoration: 'none', color: 'black' }}>
                        Nhấn vào đây
                      </Link>
                    </Box>
                    <Box mt={8}>
                      Bạn chưa có tài khoản?{' '}
                      <Link
                        as={ReactLink}
                        to='signup'
                        color='orange.600'
                        textDecoration='none'
                        _hover={{ textDecoration: 'none', color: 'black' }}>
                        Đăng ký
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={[3, 3, 3, 2, 2]}>
                <Grid templateColumns='1fr 1fr' templateRows='1fr 1fr' gap={2}>
                  <GridItem>
                    <MediaBox
                      imageUrl={Coins}
                      title='Tích điểm nhanh chóng'
                      description='Tích điểm đối với mỗi lượt đặt chỗ thành công. Quy đổi điểm để du lịch nhiều hơn nữa.'
                    />
                  </GridItem>
                  <GridItem>
                    <MediaBox
                      imageUrl={TopSales}
                      title='Tiện ích thông minh'
                      description='Check-in và kiểm tra hóa đơn thanh toán kể cả khi không có kết nối mạng. Hoàn tiền nhanh gọn. Đổi lịch dễ dàng.'
                    />
                  </GridItem>
                  <GridItem>
                    <MediaBox
                      imageUrl={Wallet}
                      title='Thanh toán đơn giản'
                      description='Phương thức thanh toán tiện lợi, an toàn. Tích hợp chức năng lưu thẻ để đặt phòng lần sau.'
                    />
                  </GridItem>
                  <GridItem>
                    <MediaBox
                      imageUrl={BackPack}
                      title='Ưu đãi mỗi ngày'
                      description='Nhận thông báo ưu đãi khi có kế hoạch du lịch để lựa chọn và đặt ngay cho mình một chỗ ở phù hợp, tiện nghi với giá tốt nhất.'
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </Container>
        </Box>
        <Copyright />
      </Grid>
    </>
  )
}

export default Login
