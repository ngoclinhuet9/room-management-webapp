import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'
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
  const params: Params = useParams()
  const history = useHistory()
  const handleAccept = async () => {
    try {
      axios
        .put(`rooms/${params?.room_id}/approve`)
        .then((res) => {
          console.log(res)
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
      //   type: 'APPROVE_ROOM',
      // })
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
          console.log(res)
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
          Đồng ý
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
