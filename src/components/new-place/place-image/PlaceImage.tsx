/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { storage } from 'firebase-config'
import InfoBox from '../InfoBox'

const PlaceImage = ({
  completeStep,
  syncData,
  imageData,
}: {
  completeStep: Function
  syncData: Function
  imageData: any
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<Array<any>>([])

  useEffect(() => {
    if (fileList.length >= 3) {
      completeStep(true)
    } else {
      completeStep(false)
    }
  }, [completeStep, fileList.length])

  useEffect(() => {
    const temp: Array<any> = []
    if (imageData) {
      imageData?.forEach((image: string) => {
        temp.push({
          url: image,
        })
      })
      setFileList(temp)
    }
  }, [])

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }

  const handleChange = ({ fileList }: { fileList: Array<any> }) => {
    console.log(fileList)
    setFileList(fileList)
    const images: Array<string> = []
    // fileList.map((file: any) => {
    //   console.log(file.response)
    // })
    fileList.forEach((file) => {
      if (file.response) {
        file.url = file.response.url
        images.push(file.response)
      }
    })
    syncData(fileList)
    console.log(images)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const customRequest = ({
    file,
    onSuccess,
  }: {
    file: any
    onSuccess: Function
  }): void => {
    const name = Date.now().toString()
    storage
      .ref('images')
      .child(name)
      .put(file)
      .then(() => {
        storage
          .ref('images')
          .child(name)
          .getDownloadURL()
          .then((url) => {
            onSuccess(url)
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }
  return (
    <Box mt={10} pb={10}>
      <Flex>
        <Box
          border='1px'
          borderColor='gray.200'
          borderRadius='md'
          p={5}
          w='60%'>
          <Box borderBottomColor='gray.200' borderBottomWidth={1} mb={5} pb={3}>
            <Text fontSize='xl' fontWeight='bold'>
              Hình ảnh chỗ nghỉ
            </Text>
            <Text color='gray.500' fontSize='md'>
              Một vài tấm ảnh đẹp sẽ giúp khách hàng có nhiều thiện cảm hơn về
              chỗ nghỉ của bạn.
            </Text>
          </Box>
          <FormControl id='overview_image' isRequired mb={5}>
            <FormLabel>Ảnh chỗ nghỉ (Ít nhất 1 ảnh):</FormLabel>
            <Upload
              // customRequest={customRequest}
              action='localhost:3000'
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}>
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}>
              <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </FormControl>
        </Box>
        <Spacer />
        <Box w='35%'>
          <InfoBox
            title='Một vài gợi ý giúp ảnh chỗ nghỉ ghi điểm trong mắt khách hàng'
            content='Ảnh bìa là yếu tố gây ấn tượng đầu tiên của chỗ nghỉ với khách hàng. Ảnh bìa chỗ nghỉ nên là tấm ảnh có góc rộng, chụp được tổng quan chỗ nghỉ, màu sắc ảnh sáng và sắc nét.
            Hãy đảm bảo rằng 5 ảnh đầu tiên của chỗ nghỉ đều là ảnh ngang, đủ ánh sáng và thể hiện rõ nhất các ưu điểm tại chỗ nghỉ của bạn.'
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default PlaceImage
