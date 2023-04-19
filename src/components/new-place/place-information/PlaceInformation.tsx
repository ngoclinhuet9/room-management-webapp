
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BaseInformation from './BaseInformation'
import Position from './Position'
import Room from './Room'
import Facility from './Facility'
import Rule from './Rule'
import Overview from './Overview'

const PlaceInformation = ({
  completeStep,
  syncData,
  data,
}: {
  completeStep: Function
  syncData: Function
  data: any
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const [isCompleteBaseInfo, setIsCompleteBaseInfo] = useState(false)
  const [isCompletePosition, setIsCompletePosition] = useState(false)
  const [isCompleteRoom, setIsCompleteRoom] = useState(false)
  const [isCompleteFacility, setIsCompleteFacility] = useState(false)
  const [isCompleteRule, setIsCompleteRule] = useState(false)
  const [isCompleteOverview, setIsCompleteOverview] = useState(false)

  const [name, setPlaceName] = useState(data.name)
  const [description, setDescription] = useState(data.description)
  const [roomType, setRoomType] = useState(data.roomType)
  const [city, setCity] = useState(data.city)
  const [address, setAddress] = useState(data.address)
  const [rule, setRule] = useState(data.rule)
  const [area, setArea] = useState(data.area)
  const [amount, setAmount] = useState(data.amount)
  const [bathroomType, setBathroomType] = useState(data.bathroomType)
  const [kitchenType, setKitchenType] = useState(data.kitchenType)
  const [isWithOwner, setIsWithOwner] = useState(data.isWithOwner)
  const [hasWaterHeater, setHasWaterHeater] = useState(data.hasWaterHeater)
  const [hasConditioner, setHasConditioner] = useState(data.hasConditioner)
  const [hasBalcony, setHasBalcony] = useState(data.hasBalcony)
  const [hasFridge, setHasFridge] = useState(data.hasFridge)
  const [hasBed, setHasBed] = useState(data.hasBed)
  const [hasWardrobe, setHasWardrobe] = useState(data.hasWardrobe)

  useEffect(() => {
    if (data) {
      setPlaceName(data.name)
      setDescription(data.description)
      setRoomType(data.roomType)
      setCity(data.city)
      setAddress(data.address)
      setRule(data.rule)
      setArea(data.area)
      setAmount(data.amount)
      setBathroomType(data.bathroomType)
      setKitchenType(data.kitchenType)
      setIsWithOwner(data.isWithOwner)
      setHasWaterHeater(data.hasWaterHeater)
      setHasConditioner(data.hasConditioner)
      setHasBalcony(data.hasBalcony)
      setHasFridge(data.hasFridge)
      setHasBed(data.hasBed)
      setHasWardrobe(data.hasWardrobe)
    }
  }, [data])
  useEffect(() => {
    if (
      isCompleteBaseInfo
      && isCompletePosition
      && isCompleteRoom
      && isCompleteFacility
      && isCompleteRule
      && isCompleteOverview
    ) {
      completeStep(true)
      syncData({
        name,
        description,
        city,
        roomType,
        address,
        rule,
        area,
        amount,
        bathroomType,
        kitchenType,
        isWithOwner,
        hasWaterHeater,
        hasConditioner,
        hasBalcony,
        hasFridge,
        hasBed,
        hasWardrobe
      })
      // console.log({
      //   name,
      //   description,
      //   city,
      //   roomType,
      //   address,
      //   rule,
      //   area,
      //   bathroomType,
      //   kitchenType,
      //   isWithOwner,
      //   hasWaterHeater,
      //   hasConditioner,
      //   hasBalcony,
      //   hasFridge,
      //   hasBed,
      //   hasWardrobe
      // })
    } else {
      completeStep(false)
    }
  }, [
    address,
    city,
    completeStep,
    description,
    hasWaterHeater,
    hasConditioner,
    hasBalcony,
    hasFridge,
    hasBed,
    hasWardrobe,
    isCompleteBaseInfo,
    isCompleteFacility,
    isCompleteOverview,
    isCompletePosition,
    isCompleteRoom,
    isCompleteRule,
    name,
    roomType,
    area,
    amount,
    bathroomType,
    kitchenType,
    isWithOwner,
    rule,
    syncData,
  ])

  const Done = () => (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: '#11ea11',
        borderRadius: '50%',
        marginLeft: '5px',
      }}
    />
  )

  const Require = () => (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        marginLeft: '5px',
      }}
    />
  )

  return (
    <Tabs isFitted isManual colorScheme='orange' mt={8} pb={10}>
      <TabList mb='1em'>
        <Tab onClick={scrollToTop}>
          Thông tin cơ bản {!isCompleteBaseInfo ? <Require /> : <Done />}
        </Tab>
        <Tab onClick={scrollToTop} isDisabled={!isCompleteBaseInfo}>
          Địa điểm {!isCompletePosition ? <Require /> : <Done />}
        </Tab>
        <Tab
          onClick={scrollToTop}
          isDisabled={!(isCompleteBaseInfo && isCompletePosition)}>
          Phòng {!isCompleteRoom ? <Require /> : <Done />}
        </Tab>
        <Tab
          onClick={scrollToTop}
          isDisabled={
            !(isCompleteBaseInfo && isCompletePosition && isCompleteRoom)
          }>
          Tiện nghi {!isCompleteFacility ? <Require /> : <Done />}
        </Tab>
        <Tab
          onClick={scrollToTop}
          isDisabled={
            !(
              isCompleteBaseInfo
              && isCompletePosition
              && isCompleteRoom
              && isCompleteFacility
            )
          }>
          Nội quy chỗ nghỉ {!isCompleteRule ? <Require /> : <Done />}
        </Tab>
        <Tab
          onClick={scrollToTop}
          isDisabled={
            !(
              isCompleteBaseInfo
              && isCompletePosition
              && isCompleteRoom
              && isCompleteFacility
              && isCompleteRule
            )
          }>
          Giới thiệu {!isCompleteOverview ? <Require /> : <Done />}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <BaseInformation
            completeTab={setIsCompleteBaseInfo}
            syncPlaceName={setPlaceName}
            syncPlaceType={setRoomType}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <Position
            completeTab={setIsCompletePosition}
            syncCity={setCity}
            syncAddress={setAddress}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <Room
            completeTab={setIsCompleteRoom}
            syncAmount={setAmount}
            syncBathroomType={setBathroomType}
            syncKitchen={setKitchenType}
            syncIsWithOwner={setIsWithOwner}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <Facility
            completeTab={setIsCompleteFacility}
            syncWaterHeater={setHasWaterHeater}
            syncConditioner={setHasConditioner}
            syncBalcony={setHasBalcony}
            syncFridge={setHasFridge}
            syncBed={setHasBed}
            syncWardrobe={setHasWardrobe}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <Rule
            completeTab={setIsCompleteRule}
            syncRule={setRule}
            data={data}
          />
        </TabPanel>
        <TabPanel>
          <Overview
            completeTab={setIsCompleteOverview}
            syncOverview={setDescription}
            data={data}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default PlaceInformation
