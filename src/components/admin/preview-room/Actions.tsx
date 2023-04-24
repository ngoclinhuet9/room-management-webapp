import { Box, Button, Flex, toast, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'utils/axios'
import { useParams, useHistory } from 'react-router-dom'
import { firestore } from 'firebase-config'

type Params = {
  room_id: string
}
const Actions = ({
  roomId,
  ownerId,
}: {
  roomId: string | undefined
  ownerId: string | undefined
}) => {
  const toast = useToast()
  const params: Params = useParams()
  const history = useHistory()
  const handleAccept = async () => {
    try {
      axios
        .put(`rooms/${params?.room_id}/approve`)
        .then((res) => {
          toast({
            title: 'Thành công',
            description: 'Bạn đã phê duyệt yêu cầu thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        })
        .catch((err) => {
          console.log(err)
        })
      history.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }
  const handleReject = async () => {
    try {
      axios
        .put(`rooms/${params?.room_id}/reject`)
        .then((res) => {
          toast({
            title: 'Thành công',
            description: 'Bạn đã từ chối yêu cầu thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        })
        .catch((err) => {
          console.log(err)
        })
      // firestore().collection('notifications').add({
      //   sender: '',
      //   senderType: 'admin',
      //   receiver: ownerId,
      //   receiverType: 'owner',
      //   roomId,
      //   type: 'REJECT_ROOM',
      // })
      history.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box padding='1.5rem 0'>
      <Flex flexDirection='row' justifyContent='flex-end'>
        <Button
          onClick={handleAccept}
          outline='0'
          fontSize='1.25rem'
          colorScheme='green'
          mr='10px'
          fontWeight='500'>
          Phê duyệt
        </Button>
        <Button
          onClick={handleReject}
          outline='0'
          fontSize='1.25rem'
          colorScheme='red'
          fontWeight='500'>
          Từ Chối
        </Button>
      </Flex>
    </Box>
  )
}

export default Actions
