/* eslint-disable operator-linebreak */
import { Box, Button, useToast } from '@chakra-ui/react'
import PlaceInformation from 'components/new-place/place-information/PlaceInformation'
import PlaceImage from 'components/new-place/place-image/PlaceImage'
import PricePolicy from 'components/new-place/price-policy/PricePolicy'
import React, { useEffect, useState } from 'react'

import OwnerLayout from 'layouts/OwnerLayout'
import { Steps } from 'antd'
import axios from 'utils/axios'
import { useHistory, useParams } from 'react-router-dom'
import { firestore } from 'firebase-config'

const { Step } = Steps
type Params = {
  room_id: string
}
const CreatePlace = ({ data, status }: { data?: any; status: string }) => {
  const params: Params = useParams()
  const history = useHistory()
  const [isCompletePlaceInfo, setIsCompletePlaceInfo] = useState(false)
  const [isCompletePlaceImage, setIsCompletePlaceImage] = useState(false)
  const [isCompletePlacePolicy, setIsCompletePlacePolicy] = useState(false)
  const [placeInfo, setPlaceInfo] = useState({
    name: data ? data.name : '',
    description: data?.description || '',
    city: data?.city || '',
    roomType: data?.roomType || '',
    address: data?.address || '',
    rule: data?.rule || '',
    area: data?.area || 15,
    bathroomType: data?.bathroomType || 'PRIVATE',
    kitchenType: data?.kitchenType || 'PRIVATE',
    isWithOwner: data?.isWithOwner || true,
    hasWaterHeater: data?.hasWaterHeater || true,
    hasConditioner: data?.hasConditioner || true,
    hasBalcony: data?.hasBalcony || true,
    hasFridge: data?.hasFridge || true,
    hasBed: data?.hasBed || true,
    hasWardrobe: data?.hasWardrobe || true,
  })
  useEffect(() => {
    if (data) {
      setPlaceInfo(data)
      setPlaceImage(data.images)
      setPlacePolicy(data)
    }
  }, [data])

  const [placeImage, setPlaceImage] = useState<Array<string>>([])
  const [placePolicy, setPlacePolicy] = useState({
    roomPrice: 2000000,
    waterPrice: 5000,
    electricityPrice: 5000,
  })

  const toast = useToast()

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (placeImage?.length >= 1) {
      setIsCompletePlaceImage(true)
    }
  }, [placeImage])

  const next = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (current === 0 && isCompletePlaceInfo) {
      setCurrent(1)
    } else if (current === 1 && isCompletePlaceInfo && isCompletePlaceImage) {
      setCurrent(2)
    } else if (
      current === 2 &&
      isCompletePlaceInfo &&
      isCompletePlaceImage &&
      isCompletePlacePolicy
    ) {
      try {
        if (status === 'renew') {
          const res = await axios({
            url: `/rooms/${params?.room_id}/renew`,
            method: 'put',
            data: { ...placeInfo, images: placeImage, ...placePolicy },
          })
          if (res) {
            toast({
              title: 'Thành công',
              description:
                'Bạn đã đăng lại bài thành công, bài viết của bạn đang được chờ phê duyệt',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
            history.push(`/owner/rooms/${params?.room_id}/preview`)
            console.log(res.data.data.owner)
            // await firestore.collection('notifications').add({
            //   sender: res.data.data.owner,
            //   senderType: 'owner',
            //   receiver: '',
            //   receiverType: 'admin',
            //   roomId: res.data.data._id,
            //   type: 'CREATE_ROOM',
            // })
          }
        } else if (status === 'update') {
          const res = await axios({
            url: `/rooms/${params?.room_id}/update`,
            method: 'put',
            data: {
              ...placeInfo,
              images: placeImage,
              ...placePolicy,
            },
          })
          if (res) {
            toast({
              title: 'Thành công',
              description: 'Bạn đã cập nhật bài viết thành công',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
            history.push(`/owner/rooms/${params?.room_id}/preview`)
            // await firestore.collection('notifications').add({
            //   sender: res.data.data.owner,
            //   senderType: 'owner',
            //   receiver: '',
            //   receiverType: 'admin',
            //   roomId: res.data.data._id,
            //   type: 'CREATE_ROOM',
            // })
          }
        } else {
          const res = await axios({
            url: `/rooms/create`,
            method: 'post',
            data: {
              ...placeInfo,
              images: placeImage,
              ...placePolicy,
            },
          })
          if (res) {
            toast({
              title: 'Thành công',
              description:
                'Bạn đã đăng bài thành công, bài viết của bạn đang được chờ phê duyệt',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top',
            })
            history.push(`/owner/rooms/${res.data.data._id}/preview`)
            console.log(res.data.data.owner)
            // await firestore.collection('notifications').add({
            //   sender: res.data.data.owner,
            //   senderType: 'owner',
            //   receiver: '',
            //   receiverType: 'admin',
            //   roomId: res.data.data._id,
            //   type: 'CREATE_ROOM',
            // })
          }
        }
      } catch (error: any) {
        console.log(error)
        toast({
          title: 'Sai định dạng dữ liệu',
          description: error?.response?.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      }
    } else {
      toast({
        title: 'Bạn cần điền đầy đủ thông tin',
        description: 'Vui lòng điền vào những trường yêu cầu',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const prev = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrent(current - 1)
  }

  const steps = [
    {
      title: 'Thông tin chỗ nghỉ',
      content: (
        <PlaceInformation
          completeStep={setIsCompletePlaceInfo}
          syncData={setPlaceInfo}
          data={placeInfo}
        />
      ),
    },
    {
      title: 'Hình ảnh chỗ nghỉ',
      content: (
        <PlaceImage
          completeStep={setIsCompletePlaceImage}
          syncData={setPlaceImage}
          imageData={placeImage}
        />
      ),
    },
    {
      title: 'Giá và quy định nhận chỗ',
      content: (
        <PricePolicy
          completeStep={setIsCompletePlacePolicy}
          syncData={setPlacePolicy}
          data={placePolicy}
        />
      ),
    },
  ]

  return (
    <OwnerLayout title={placeInfo?.name}>
      <Box mb={5}>
        <Box maxW='80%' m='30px auto' pb={5}>
          <Steps current={current} direction='horizontal'>
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                style={{ fontWeight: 'bold' }}
              />
            ))}
          </Steps>
          <div className='steps-content'>{steps[current].content}</div>
          <div className='steps-action buttonWrapperClass'>
            {current < steps.length - 1 && (
              <Button colorScheme='orange' mr={5} onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button colorScheme='orange' mr={5} onClick={() => next()}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button colorScheme='teal' onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </Box>
      </Box>
    </OwnerLayout>
  )
}

export default CreatePlace
