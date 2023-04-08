import Logo from 'assets/logo2.png';
import { Box, Container, Image, Stack, Text, Link } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
// import {useSession} from 'next-auth/client'
// import format from 'date-fns/format'
// import NextLink from 'next/link'
import { Link as ReactLink, useLocation } from 'react-router-dom'

const Header = () => {
  // const activeLink = useRouter().pathname
  // const [session] = useSession()
  let location = useLocation();
  const ActiveBar = {
    editAccount: '/account',
    wishList: '/bookmarks'
  }

  return (
    <Box bg='#fff'>
      <Container maxW='100%' px={40} />
      <Box>
        <Container maxW='100%' px={40}>
          <Stack direction='row' color='#a3acb9' fontWeight='medium' spacing={7}>
            <Link as={ReactLink}
              to='/renter/account'
            >
              <Text sx={{
                borderBottom: ActiveBar.editAccount === location.pathname ? '4px solid #F65E39' : '',
                color: ActiveBar.editAccount === location.pathname ? '#222' : '',
                py: '3',
                fontWeight: 'medium',
                ':hover': {
                  color: '#222',
                  cursor: 'pointer',
                },
              }}>Cài đặt tài khoản</Text>
            </Link>
            <Link as={ReactLink}
              to='/renter/bookmarks'
            >
              <Text sx={{
                borderBottom: location.pathname === ActiveBar.wishList ? '4px solid #F65E39' : '',
                color: location.pathname === ActiveBar.wishList ? '#222' : '',
                py: '3',
                fontWeight: 'medium',
                ':hover': {
                  color: '#222',
                  cursor: 'pointer',
                },
              }}>Yêu thích</Text>
            </Link>
          </Stack>
        </Container>
      </Box>
      <Box>
        <Container />
      </Box>
    </Box>
  )
};

export default Header;
