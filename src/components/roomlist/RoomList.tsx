import React from 'react'

import { Grid, Box } from '@chakra-ui/react'
import RoomItem from './RoomItem'

function RoomList({ roomList }: { roomList: Array<any> }) {
  return (
    <Box maxW='calc(1100px + 5.6rem)' m='40px auto'>
      <Grid templateColumns='repeat(5, 1fr)' rowGap={5} columnGap={3}>
        {roomList.map((item: any) => {
          return (
            <RoomItem
              placeId={item._id}
              name={item.name}
              placeType={item.roomType}
              price={item.roomPrice}
              isLoading={false}
              image={item.images[0]}
            />
          )
        })}
      </Grid>
    </Box>
  )
}

export default RoomList
