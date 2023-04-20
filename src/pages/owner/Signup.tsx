/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable operator-linebreak */

/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import { EmailIcon } from '@chakra-ui/icons'
import {
  Grid,
  useToast,
  InputGroup,
  InputRightElement,
  Box,
  Container,
  Text,
  GridItem,
  Input,
  Button,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import MediaBox from 'components/login/MediaBox'
import Coins from 'assets/signin/coins.png'
import TopSales from 'assets/signin/top-sales.png'
import Wallet from 'assets/signin/wallet.png'
import BackPack from 'assets/signin/backpack.png'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import useRedux from 'hooks/useRedux'
import actions from 'store/actions'
import { auth } from 'firebase-config'

type FormData = {
  name: string
  identity: string
  email: string
  role: string
  phone: string
  address: string
  password: string
  password_confirmation: string
  passwordNotMatch: string
}

const SignUp = () => {
  const history = useHistory()
  const { dispatch } = useRedux()
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const handleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormData>()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  const onSubmit: SubmitHandler<FormData> = async (formData: any) => {
    try {
      setLoading(true)
      dispatch(
        actions.signupByEmailAndPassword({
          ...formData
        })
      )
      setLoading(false)
      toast({
        title: 'Thành công',
        description: 'Tài khoản của bạn đang được chờ phê duyệt',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      auth.signOut()
      localStorage.clear()
      history.push('/login')
    } catch (error: any) {
      console.log(error?.response?.data?.error)
      setLoading(false)
      return toast({
        title: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi đăng ký, xin vui lòng thử lại!',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Grid templateRows='auto 1fr auto' maxWidth='100%' minH='100vh'>
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

              <GridItem colSpan={[3, 3, 3, 1, 1]} mt={20}>
                <Box
                  p={8}
                  background='white'
                  boxShadow='xl'
                  mt='-6.875rem'
                  borderRadius='lg'>
                  <Box as='h3' fontSize='2xl' fontWeight='black' mb={8}>
                    Đăng ký thành viên
                </Box>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl
                      id='name'
                      isRequired
                      isInvalid={Boolean(errors.name?.message)}>
                      <FormLabel>Tên đầy đủ</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          pr='4.5rem'
                          required
                          {...register("name", {
                            maxLength: {
                              value: 50,
                              message: 'Tên của bạn đã vượt quá 50 ký tự',
                            },
                          })}
                          borderRadius='3rem'
                          _placeholder={{ fontSize: 'md' }}
                          _focus={{
                            borderColor: 'orange.500',
                            boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.name?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id='email'
                      isRequired
                      isInvalid={Boolean(errors?.email)}
                      mt={4}>
                      <FormLabel>Địa chỉ email</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          type='email'
                          required
                          borderRadius='3rem'
                          {...register("email", {
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Email không hợp lệ',
                            },
                          })}
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
                      <FormHelperText>
                        Chúng tôi sẽ không bao giờ chia sẻ email của bạn.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id='role'
                      isRequired
                      mt={4}>
                      <FormLabel>Role</FormLabel>
                      <InputGroup size='lg'>
                      <Select
                        pr='4.5rem'
                        alignItems='center'
                        height='50px'
                        width='100%'
                        px={1}
                        borderRadius='3rem'
                        border='1px'
                        defaultValue='renter'
                        {...register("role")}
                        _focus={{
                          borderColor: 'orange.500',
                          boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                        }}
                        //</InputGroup>onChange={(event: any) => setCity(event.target.value)}
                        >
                        <option value='renter'>Người thuê phòng</option>
                        <option value='owner'>Chủ phòng</option>
                      </Select>
                      </InputGroup>
                    </FormControl>
                    <FormControl
                      id='identity'
                      isRequired
                      isInvalid={Boolean(errors?.email)}
                      mt={4}>
                      <FormLabel>Chứng minh nhân dân</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          required
                          borderRadius='3rem'
                          {...register("identity", {
                            minLength: {
                              value: 9,
                              message: 'Chứng minh nhân tối thiểu 9 số',
                            },
                          })}
                          _placeholder={{ fontSize: 'md' }}
                          _focus={{
                            borderColor: 'orange.500',
                            boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl
                      id='address'
                      isRequired
                      isInvalid={Boolean(errors?.email)}
                      mt={4}>
                      <FormLabel>Địa chỉ</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          required
                          borderRadius='3rem'
                          {...register("address", {
                            maxLength: {
                              value: 200,
                              message: 'Địa chỉ của bạn quá dài',
                            },
                          })}
                          _placeholder={{ fontSize: 'md' }}
                          _focus={{
                            borderColor: 'orange.500',
                            boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl
                      id='phone'
                      isRequired
                      isInvalid={Boolean(errors?.email)}
                      mt={4}>
                      <FormLabel>Số điện thoại</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          required
                          borderRadius='3rem'
                          {...register("phone", {
                            pattern: {
                              value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                              message: 'Số điện thoại không hợp lệ',
                            },
                          })}
                          _placeholder={{ fontSize: 'md' }}
                          _focus={{
                            borderColor: 'orange.500',
                            boxShadow: '0 0 5px 0 rgba(246,94,57,.5)',
                          }}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.phone?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id='password'
                      isRequired
                      mt={4}
                      isInvalid={Boolean(errors.password?.message)}>
                      <FormLabel>
                        Mật khẩu{' '}
                        <Box as='span' color='gray.600'>
                          (Tối thiểu 6 ký tự)
                        </Box>
                      </FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          pr='4.5rem'
                          required
                          type={showPassword ? 'text' : 'password'}
                          borderRadius='3rem'
                          {...register("password", {
                            minLength: {
                              value: 6,
                              message: 'Mật khẩu tối thiểu 6 ký tự',
                            },
                          })}
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
                      <FormErrorMessage>
                        {errors.password?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id='password-confirmation'
                      isRequired
                      mt={4}
                      isInvalid={Boolean(
                        errors.password_confirmation?.message ||
                        errors?.passwordNotMatch?.message
                      )}>
                      <FormLabel>Nhập lại mật khẩu</FormLabel>
                      <InputGroup size='lg'>
                        <Input
                          pr='4.5rem'
                          required
                          type={showPasswordConfirmation ? 'text' : 'password'}
                          {...register("password_confirmation", {
                            minLength: {
                              value: 6,
                              message: 'Mật khẩu tối thiểu 6 ký tự',
                            },
                          })}
                          onChange={() => {
                            const password = getValues('password')
                            const passwordConfirmation = getValues(
                              'password_confirmation'
                            )
                            clearErrors('passwordNotMatch')

                            if (password !== passwordConfirmation) {
                              setError('passwordNotMatch', {
                                type: 'manual',
                                message:
                                  'Mật khẩu và nhập lại mật khẩu không trùng khớp!',
                              })
                            }
                          }}
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
                            onClick={handleShowPasswordConfirmation}>
                            {showPasswordConfirmation ? 'Ẩn' : 'Hiện'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.password_confirmation?.message}
                      </FormErrorMessage>
                      <FormErrorMessage>
                        {errors.passwordNotMatch?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      colorScheme='orange'
                      size='md'
                      type='submit'
                      mt={8}
                      w='100%'
                      borderRadius='3em'
                      boxShadow='0 4px 12px 0 rgba(246,116,57,.4)'
                      backgroundImage='linear-gradient(90deg,#f65e38 0,#f68a39 51%,#f65e38)'
                      backgroundSize='200% auto'
                      height='3.5rem'
                      disabled={loading}
                      _disabled={{ opacity: 0.5 }}
                      _hover={{
                        backgroundPosition: '100%',
                      }}>
                      Đăng ký
                    </Button>
                    <Box mt={8} textAlign='center' fontWeight='bold'>
                      <Box mt={8}>
                        Bạn đã có tài khoản?{' '}
                        <Link
                          as={ReactLink}
                          to='/login'
                          color='orange.600'
                          textDecoration='none'
                          _hover={{ textDecoration: 'none', color: 'black' }}>
                          Đăng nhập
                          </Link>
                      </Box>
                    </Box>
                  </form>
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
      </Grid>
    </>
  )
}

export default SignUp
