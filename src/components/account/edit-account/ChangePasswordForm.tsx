import { Box, Text, Input, Button,InputGroup, InputRightElement, useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'
import actions from 'store/actions'
import useRedux from 'hooks/useRedux'
import { auth } from 'firebase-config'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormData = {
  password: string
  password_confirmation: string
  passwordNotMatch: string
  required_pass: string
  required_repass: string
}

const ChangePasswordForm = () => {
  const toast = useToast()
  const { dispatch } = useRedux()
  const [rePass, setRePass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormData>()
  const [loading, setLoading] = useState<boolean>(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const handleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation)

  const checkConfirmPassword = (rePassword: string) => {
    setRePass(rePassword)
    const password = getValues('password')
    
    clearErrors('passwordNotMatch')
    
    if (password !== rePassword) {
      setError('passwordNotMatch', {
        type: 'manual',
        message:
          'Mật khẩu và nhập lại mật khẩu không trùng khớp!',
      })
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (formData: any) => {
    if (!formData.password) {
      setError('password', {
        type: 'manual',
        message:
          'Vui lòng nhập mật khẩu mới!',
      })
    }
    if (!formData.password_confirmation) {
      setError('required_repass', {
        type: 'manual',
        message:
          'Vui lòng nhập mật khẩu xác nhận!',
      })
    }
    if (formData.password_confirmation !== formData.password) {
      return;
    }
    try {
      setLoading(true)
      dispatch(
        actions.updatePassword({...formData})
      )
      setNewPass('')
      setRePass('')
      setLoading(false)
      return toast({
        title: 'Thành công',
        description: 'Thay đổi password thành công!',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    } catch (error: any) {
      return toast({
        title: 'Lỗi',
        description: 'Đã có lỗi xảy ra khi thay đổi password, xin vui lòng thử lại!',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <Box flexBasis='66.67%' pl={8}>
      <Box animation='fadeIn .4s ease-in-out'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  value={newPass}
                  required
                  autoComplete='off'
                  type={showPassword ? 'text' : 'password'}
                  borderRadius='3rem'
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu tối thiểu 6 ký tự',
                    }
                  })}
                  onChange={(event) => setNewPass(event.target.value)}
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
                {errors.required_pass?.message}
              </FormErrorMessage>
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
                  value={rePass}
                  required
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  {...register("password_confirmation", {
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu tối thiểu 6 ký tự',
                    },
                  })}
                  onChange={(event) => checkConfirmPassword(event.target.value)}
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
                {errors.required_repass?.message}
              </FormErrorMessage>
              <FormErrorMessage>
                {errors.password_confirmation?.message}
              </FormErrorMessage>
              <FormErrorMessage>
                {errors.passwordNotMatch?.message}
              </FormErrorMessage>
            </FormControl>
            <Box mt={6}>
              <Button 
                color='#fff' 
                backgroundColor='#f65e39' 
                type='submit'
                disabled={loading}
                _disabled={{ opacity: 0.5 }}>
                Cập nhật
              </Button>
        </Box>
          </form>
      </Box>
    </Box>
  )
}

export default ChangePasswordForm
