/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import axios from 'utils/axios'

export default function ReturnVP() {
    useEffect(() => {
        axios
          .get(`/returnURL`)
          .then((res) => {
          })
          .catch((err) => {
            console.log(err)
          })
      }, [])
  return (
    <Box></Box>
  )
}
