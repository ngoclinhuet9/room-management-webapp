/* eslint-disable no-nested-ternary */
import { Box, List, ListItem, Link, Button, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { Link as ReactLink, useLocation } from 'react-router-dom'
import EditAccount from './EditAccount'
import ChangePasswordForm from './ChangePasswordForm'

const SideBar = () => {
  const [part, setPart] = useState('info')
  let location = useLocation()
  return (
    <Container maxW='100%' px={40} display='flex'>
      <List
        flex='1'
        sx={{
          li: {
            py: '4',
            color: '#666',
          },
          'li:not(:last-child)': {
            borderBottom: '1px solid #e6e6e6',
          },
          'li:hover': {
            cursor: 'pointer',
          },
        }}
        borderRadius='lg'
        boxShadow='1px 1px 1px 0 rgba(0,0,0,.05)'
        px={6}
        backgroundColor='#fff'>
        <ListItem
          style={{
            color: part === 'info' ? '#333 !important' : '',
            fontWeight: part === 'info' ? 'bold' : 'normal',
          }}>
          <Button variant='ghost' onClick={() => setPart('info')}>
            Thông tin tài khoản
          </Button>
        </ListItem>
        <ListItem
          style={{
            color: part === 'changePass' ? '#333 !important' : '',
            fontWeight: part === 'changePass' ? 'bold' : 'normal',
          }}>
          <Button variant='ghost' onClick={() => setPart('changePass')}>
            Thay đổi mật khẩu
          </Button>
        </ListItem>
      </List>
      <Box flex='3' ml='50px'>
        {part === 'info' ? (
          <EditAccount />
        ) :(
          <ChangePasswordForm />
        )}
      </Box>
    </Container>
  )
}

export default SideBar
