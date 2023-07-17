import React, { useEffect, useState } from 'react'

import { Box, Button, Center, Heading, HStack, Icon, Image, Input, ScrollView, Text, useDisclose, useTheme, VStack } from 'native-base'
import { ImageBackground, Pressable } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates'
import SvgCalendar from '../../Screens/Home/assets/Calendar'
import { useNavigation,useIsFocused } from '@react-navigation/native'
import { COLORS } from '../../constants'
import { postActionSelector, postRootSelector } from '../../Redux/SO/selector';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as action from '../../Redux/SO/action';
import * as actionName from '../../Redux/SO/actionName';
import ModalDate from '../ModalDate'
import LoadingOverlay from '../LoadingOverlay'


type dataList  = {
  "OrderId": number,
  "OrderNo" : string,
  "OrderDate" : string,
  "CustomerId": number,
  "Address" : string,
  "ItemList" : [],
  "CustomerName": string
}[]

const Content = () => {
    let temp = [] as dataList
    const navigation = useNavigation()
    const isFocused = useIsFocused()


    const { isOpen, onOpen, onClose } = useDisclose()
    const [date, setDate] = React.useState("");
    const [keyword, setkeyword] = React.useState("");
    const postState = useSelector(postRootSelector, shallowEqual)
    const dispatch = useDispatch()
    const actionState = useSelector(postActionSelector)
    const [data, setdata] = useState(temp);
    const [search, setsearch] = useState(temp);

     // Time Loading with setup Page
    const [loadtime, setloadtime] = useState(true)


    useEffect(() => {
      // @ts-ignore
      // dispatch(action.getOrderList())
      if (search == undefined) {
        // @ts-ignore
        dispatch(action.getOrderList())
      }
    })

    useEffect(() => {
        if (postState.success?.type === actionName.GET_ORDER_LIST ) {
          setdata(postState.posts)
          dispatch(action.resetPost())
          setloadtime(postState.loading)
        }

        if (keyword == "") {
            setsearch(postState.posts)
        }
     
    }, [actionState])

    useEffect(() => {
      // @ts-ignore
      if (postState.expired.isExpired) {
        // @ts-ignore
        dispatch(action.getToken())
      } else {
        // @ts-ignore
        dispatch(action.getOrderList())
        setloadtime(postState.loading)

      }
      return () => {
        dispatch(action.resetPost())
      }
    }, [isFocused])

    useEffect(() => {
      if (keyword == "") {
        setDate("")
      }
      temp = []
      // @ts-ignore
      dispatch(action.getOrderList())
      if (postState.success?.type === actionName.GET_ORDER_LIST ) {
          setdata(postState.posts)
          dispatch(action.resetPost())
      }

      if (date != '') {
        search?.map((data) => {
          if (data.CustomerName.toLowerCase().search(keyword.toLowerCase()) != -1) {
              temp.push(data)
          }
      })
      } else {
        data?.map((data) => {
          if (data.CustomerName.toLowerCase().search(keyword.toLowerCase()) != -1) {
              temp.push(data)
          }
      })
      }
      setsearch(temp)
    }, [keyword])

    useEffect(() => {
      if (date != "" && date) {
        search?.map((data, index) => {
          if (index == 0) {

            let str = data.OrderDate.split('T')
            // @ts-ignore
            let str2 = date?.toISOString().split('T')[0]

            if (str[0] == str2) {
              temp.push(data)
            }
          }
        })
        setsearch(temp)
      }
      
    }, [date])

    return (
      <LoadingOverlay show={loadtime}>
    <VStack bgColor={'white'} rounded="3xl" h='100%' shadow={3} >
      <VStack mt='7' space={0} borderWidth={1} borderColor={'#979C9F'} m='5' bgColor={'white'} rounded="3xl" >
        <VStack space={2} m='5' mt='2' >
          <Text bold
            fontFamily={'Poppins'}
            fontSize={'lg'}
          >
            Search
          </Text>
            {/* INPUT SEARCH */}
            <Input
            h={7}
            value={keyword}
            onChangeText={keyword => setkeyword(keyword)}
            placeholder="Keyword" />
          {/* INPUT DATE */}
          <Input
          h={7}
          // @ts-ignore
          value={date ? date.toISOString().split('T')[0] : ""}
          InputRightElement={
              <Pressable onPress={() => onOpen() }>
              <SvgCalendar />
            </Pressable>
          } placeholder="Order Date" />
          {/* MODAL */}
          {/* <DatePickerModal
              locale="en"
              mode="single"
              visible={isOpen}
              onDismiss={() => {
                  setDate("");
                  onClose()
                }}
              onConfirm={onConfirmSingle}
          /> */}
          <ModalDate
            isOpen={isOpen}
            onClose={() => {
            setDate("")
            onClose()
            }}
            onConfirm={(payload) => {
              setDate(payload)
              onClose()
            }}
          ></ModalDate>
         </VStack>   
        </VStack>
          <VStack space={4} mt={2} m={7}>
            <HStack justifyContent={'space-between'}>
              <Text
                bold
                fontSize={'lg'}
                >
                Order List
              </Text>
              <Text bold fontSize={'xs'}>Total items : {search?.length}</Text>
            </HStack>
            {/* BUTTON ADD */}
            <HStack>
              <Button
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Order', {})
                }}
                size={'xs'} w='25%' rounded={'10'} bgColor={COLORS.primary} >Add</Button>
            </HStack>
          </VStack>



          <VStack h='80'>
            <ScrollView mt={2} bottom={5}>
              <VStack  m={3} space={5}>
                {
                search?.map((data, index) => {
                  let str = data.OrderDate
                  const dateResult = new Date(str);
                  const year = dateResult.getFullYear()
                  const mont = dateResult.getMonth() + 1
                  const date = dateResult.getDate()
                  const strDate = date + "/" + mont + "/" + year
                  return  <Box key={index} bgColor={'white'} rounded="md" shadow={9} >
                  <HStack  m={5} justifyContent={'space-around'}>
                      <Text>{data.CustomerName}</Text>
                      <Text>{data.OrderNo}</Text>
                      <Text>{strDate }</Text>
                  </HStack>
                  </Box>
                })
                }
              </VStack>
          
            </ScrollView>
          </VStack>
        </VStack>
        </LoadingOverlay>
  )
}

export default Content
