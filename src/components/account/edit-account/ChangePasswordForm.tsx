import { Box, Text, Input, Button,InputGroup, InputRightElement, } from '@chakra-ui/react'
import { useState } from 'react'

const ChangePasswordForm = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const handleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation)

  const checkConfirmPassword = (rePassword: string) => {
    const password = newPass
    if(password == newPass){

    }
    else{
      
    }
  }
  return (
    <Box flexBasis='66.67%' pl={8}>
      <Box animation='fadeIn .4s ease-in-out'>
        {/* <Box>
          <Text mb={2} color='#666' fontWeight='bold'>
            Mật khẩu hiện tại
          </Text>
          <InputGroup size='lg'>
            <Input
              pr='4.5rem'
              required
              value={oldPass}
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => setOldPass(event.target.value)}
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
        </Box> */}
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Mật khẩu mới
          </Text>
          <InputGroup size='lg'>
            <Input
              pr='4.5rem'
              required
              value={newPass}
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => setNewPass(event.target.value)}
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
        </Box>
        <Box mt={6}>
          <Text mb={2} color='#666' fontWeight='bold'>
            Xác nhận mật khẩu mới
          </Text>
          <InputGroup size='lg'>
            <Input
              pr='4.5rem'
              required
              type={showPasswordConfirmation ? 'text' : 'password'}
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
        </Box>
        <Box mt={6}>
          <Button color='#fff' backgroundColor='#f65e39'>
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ChangePasswordForm
