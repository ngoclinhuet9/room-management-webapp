import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'utils/axios'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'

type Params = {
  room_id: string
}
const Actions = (props: any) => {
  const { statusRenter, isPay, status } = props
  const toast = useToast()
  const params: Params = useParams()
  const router = useRouteMatch()
  const history = useHistory()

  const [typePage, setTypeState] = useState('')

  useEffect(() => {
    if (router.url.includes('rent_preview')) {
      setTypeState('rent_preview')
    } else if (router.url.includes('rent')) {
      setTypeState('rent')
    } else if (router.url.includes('pending')) {
      setTypeState('pending')
    } else if (router.url.includes('live_room')) {
      setTypeState('live_room')
    }
  }, [])

  const [payFlag, setPayFlag] = useState(false)
  useEffect(() => setPayFlag(isPay), [isPay])
  const handleAccept = () => {
    axios
      .put(`owner/rooms/${params?.room_id}/accept`)
      .then((res) => {
        setPayFlag(true)
        toast({
          title: 'Thành công',
          description: 'Bạn đã phê duyệt yêu cầu thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        history.push('/owner/')
      })
      .catch((err) => {
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
  }

  const removeRent = () => {
    axios
      .put(`owner/rooms/${params?.room_id}/return`)
      .then((res) => {
        toast({
          title: 'Thành công',
          description: 'Bạn đã từ chối yêu cầu thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        history.push('/owner')
      })
      .catch((err) => {
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
  }

  const deleteRoom = (id: any) => {
    axios
      .delete(`owner/rooms/${params?.room_id}/delete`)
      .then((res) => {
        toast({
          title: 'Thành công',
          description: 'Bạn đã xóa phòng thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        history.push('/owner')
      })
      .catch((err) => {
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
  }

  const getCondition = (): boolean => {
    return typePage === 'rent_preview' && statusRenter == 1;
  }
  return (
    <Box padding='1.5rem 0'>
      <Flex flexDirection='row' justifyContent='flex-end'>
        {getCondition() ? (
          <>
            <Button
              outline='0'
              onClick={handleAccept}
              fontSize='1.25rem'
              colorScheme='green'
              mr='10px'
              fontWeight='500'>
              Phê duyệt
            </Button>
            <Button
              outline='0'
              onClick={removeRent}
              fontSize='1.25rem'
              colorScheme='red'
              mr='10px'
              fontWeight='500'>
              Từ chối
            </Button>
          </>
        ) : (<></>)}

        {(status === 'REJECTED' || typePage === 'live_room') && (
          <Button
            outline='0'
            onClick={deleteRoom}
            fontSize='1.25rem'
            colorScheme='red'
            mr='10px'
            fontWeight='500'>
            Xóa phòng
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Actions
