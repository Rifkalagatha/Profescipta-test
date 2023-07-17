import { Box, Button, Center, HStack, Icon, Input, ScrollView, Select, Text, useDisclose, VStack } from 'native-base'
import { Pressable } from 'react-native'
import SvgCalendar from '../Screens/Home/assets/Calendar'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { COLORS } from '../constants'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState, useEffect, useMemo } from 'react'
import Trash from '../Assets/Trash'
import Pencil from '../Assets/Pencil'
import useItemList, { ListItemData } from '../Data/ListItem/useItemList'
import NewItemModal from './ModalNewItem'
import ModalDate from './ModalDate'
import useAddItem from '../Data/AddItem/useAddItem'
import DeleteItemModal from './ModalDelelte'
import ConfirmItemModal from './ModalConfirm'
import useDeleteItem from '../Data/DeleteItem/useDeleteItem'
import UpdateItemModal from './ModalUpdateItem'
import LoadingOverlay from './LoadingOverlay'
import useUpdateItem from '../Data/UpdateItem/useUpdateItem'

const OrderContent = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    // Temporary Data To Delete After Confirm
    let DeleteTemp = [] as ListItemData
    const [deleteData, setDeleteData] = useState(DeleteTemp)

    // Time Loading with setup Page
    const [loadtime, setloadtime] = useState(true)

    // data Api Variables Fetching
    let { data: itemList, refetch, isLoading } = useItemList()  

    // Form Sales Information
    const [soNumber, setsoNumber] = useState("");
    const [date, setDate] = useState("");
    const [customer, setcustomer] = useState("");
    const [address, setaddress] = useState("");
    const [qty, setQty] = useState(0)

    // UseDisclose
    const { isOpen, onOpen, onClose } = useDisclose()

    // Modal State
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    // Key Update Or Delete To Parsing Payload
    const [key, setKey] = useState(0)

    // Set Up Data From Fetching
    const [item, setitem] = useState(itemList)
    const [summary, setSummary] = useState( 0)

    // Use Mutation Function Api
    const AddItemPost = useAddItem({}) 
    const DeleteItemPost = useDeleteItem({})
    const UpdateItemPost = useUpdateItem(({}))
    
    // Use Effect 
    useEffect(() => {
        if (item || itemList) {
            let data = (item ? item : itemList)
            let counter = 0
            // @ts-ignore
            for (let index = 0; index < data.length; index++) {
              // @ts-ignore
              counter = counter + (data[index].Price * data[index].Quantity)
            }
            setSummary(counter)
        }       
    })

    useEffect(() => {
        if (isFocused) {
            setitem([])
            setitem(itemList)
            setDeleteData([])
            refetch()
            setloadtime(isLoading)
        }
    }, [isFocused, itemList])

    useEffect(() => {
        if (item || itemList) {
            let data = (item ? item : itemList)
            let counter = 0
            // @ts-ignore
            for (let index = 0; index < data.length; index++) {
              // @ts-ignore
              counter = counter + (data[index].Price * data[index].Quantity)
            }
            setSummary(counter)
        }       
     
    }, [isFocused, showModalDelete]);

    // Return Screen
    return (
        <LoadingOverlay show={loadtime}>
            <VStack  bgColor={'white'} rounded="3xl" h='100%' shadow={3} >
                <VStack m={5} space={4} mt={5}>
                    <VStack  space={0} borderWidth={1} borderColor={'#979C9F'}  bgColor={'white'} rounded="3xl" >
                        <VStack space={2} m='5' mt='2' >
                            <Text bold
                                fontFamily={'Poppins'}
                                fontSize={'lg'}
                            >
                                Sales Information
                            </Text>
                            {/* INPUT SALES ORDER NUMBER */}
                            <Input
                            h={7}
                            value={soNumber}
                            onChangeText={soNumber => setsoNumber(soNumber)}
                            placeholder="Sales Order Number" />

                            {/* INPUT SALES ORDER DATE */}
                            <Input
                            h={7}
                            // @ts-ignore
                            value={date ? date.toISOString().split('T')[0] : ""}
                            InputRightElement={
                                <Pressable onPress={() => onOpen() }>
                                <SvgCalendar />
                                </Pressable>
                            } placeholder="Sales Order Date" />

                            {/* INPUT COSTUMER */}
                            <Select h={7}
                                placeholder="Customer"
                                onValueChange={(value) => {
                                    setcustomer(value)
                                }}
                            >
                                <Select.Item label="PROFES" value="PROFES" />
                                <Select.Item label="TITAN" value="TITAN" />
                                <Select.Item label="DIPS" value="DIPS" />
                            </Select>

                            {/* INPUT ADDRESS */}
                            <Input
                            value={address}
                            onChangeText={address => setaddress(address)}
                            placeholder="Address" />
                        </VStack> 
                    </VStack>
                        <HStack justifyContent={'space-between'}>
                            <Text bold
                            fontSize={'xl'}
                            >Detail Sales</Text>
                            {/* BUTTON ADD ITEM */}
                            <Button
                            bgColor={COLORS.primary}
                            size={'xs'}
                            w='25%' rounded={'10'}
                            onPress={() => {
                                setShowModalAdd(true)
                            }}
                            >Add Item</Button>
                        </HStack>
                </VStack>
                    <VStack h='18%' >
                        {/* SCROLL VIEW  */}
                        <ScrollView  >
                            <VStack  m={3} space={2}>
                                {
                                (item? item : itemList)?.map((data, key) => {
                                    return (
                                        <Box  key={key} bgColor={'white'} rounded="md" shadow={9} >
                                            <HStack m={2} justifyContent={'space-around'}>
                                                <VStack>
                                                    <Text bold fontSize={'md'}>{data.ItemName}</Text>
                                                    <Text mt={1} bold>{data.Price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                                                 </VStack>
                                                    <VStack w={'27%'}>
                                                        <Center>
                                                            <Text bold>QTY</Text>
                                                                <Input h={7} isDisabled={true}
                                                                _disabled={{
                                                                    opacity: 1
                                                                }}
                                                                // @ts-ignore
                                                                value={data.Quantity.toString()} 
                                                                backgroundColor={'#D9D9D9'} rounded={30} 
                                                                InputLeftElement={
                                                                    <Pressable onPress={() => {
                                                                        // @ts-ignore
                                                                        itemList[key].Quantity = data.Quantity - 1
                                                                        setitem(itemList)
                                                                        setQty(qty -1)
                                                                    }}>
                                                                        <Icon m={1}
                                                                            backgroundColor={'white'}
                                                                            as={MaterialCommunityIcons}
                                                                            name={'minus'}
                                                                            color={'black'}
                                                                            size={'xs'}
                                                                            borderRadius={100}
                                                                        />
                                                                    </Pressable>
                                                                }
                                                                InputRightElement={
                                                                    <Pressable onPress={ () => {
                                                                        // @ts-ignore
                                                                        itemList[key].Quantity = data.Quantity + 1
                                                                        setitem(itemList)
                                                                        setQty(qty +1)
                                                                    } }>
                                                                        <Icon m={1}
                                                                                backgroundColor={'white'}
                                                                                as={MaterialIcons}
                                                                                name={'add'}
                                                                                color={'black'}
                                                                                size={'xs'}
                                                                                borderRadius={100}
                                                                        />
                                                                    </Pressable>
                                                                }
                                                                >
                                                            </Input>
                                                        </Center>
                                                    </VStack>
                                                        <VStack >
                                                            <Center>
                                                                <Text bold>Total</Text>
                                                                <Text mt={1} bold>{(data.Price * data.Quantity).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                                                            </Center>
                                                        </VStack>
                                                            <Center>
                                                                <VStack>
                                                                    <HStack>
                                                                        <Button
                                                                            onPress={() => {
                                                                                setKey(key)
                                                                                setShowModalEdit(true)
                                                                            }}
                                                                            bgColor={'white'}
                                                                            size={'xs'}
                                                                        >
                                                                            <Pencil/>
                                                                        </Button>
                                                                        <Button
                                                                            onPress={() => {
                                                                                setKey(key)
                                                                                setShowModalDelete(true)
                                                                            }}
                                                                            bgColor={'white'}
                                                                            size={'xs'}
                                                                        >
                                                                            <Trash/>
                                                                        </Button>
                                                                    </HStack>
                                                                </VStack>
                                                            </Center>
                                            </HStack>
                                        </Box>
                                    )
                                })}
                                
                                
                            </VStack>
                        </ScrollView>
                    </VStack>
                        <Box borderTopWidth={0.7} borderTopColor={'#D9D9D9'} rounded={'md'}  h={'100%'}>
                            <VStack m={3}>
                                <Text bold>Order Summary</Text>
                                    <VStack m={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Text bold>Sub total :</Text>
                                            <Text bold>{summary.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                                        </HStack>
                                        <HStack justifyContent={'space-between'}>
                                            <Text bold>Total Product :</Text>
                                            <Text bold>{ (item? item : itemList)?.length + " Product"}</Text>
                                        </HStack>
                                        <HStack m={2} justifyContent={'center'} space={5}>
                                            <Button
                                                onPress={() => {
                                                    setShowModalConfirm(true)
                                                }}   
                                                bgColor={COLORS.primary}
                                                size={'xs'}
                                                w='30%' h='7' rounded={'25'}>Process order
                                            </Button>
                                            <Button
                                                onPress={() => {
                                                    setitem([])
                                                    navigation.goBack()
                                                }}
                                                bgColor={'white'}
                                                _text={{ color: 'black' }}
                                                borderWidth={1}
                                                borderColor={COLORS.primary}
                                                size={'xs'}
                                                w='30%' h='7' rounded={'25'}>Cancel
                                            </Button>
                                        </HStack>
                                    </VStack>
                            </VStack>
                        </Box>
            
            {/* MODAL COLLECION */}
                {/* ADD ITEM MODAL */}
                <NewItemModal
                    isOpen={showModalAdd}
                    onClose={() => {
                        setShowModalAdd(false)
                    }}
                    onSubmit={(payload) => {
                        if (!itemList) {
                            let temp = []
                            temp.push(payload)
                            // @ts-ignore
                            setitem(temp)
                        }
                        // @ts-ignore
                        itemList?.push(payload)
                        setitem(item)
                        setShowModalAdd(false)
                    }}
                ></NewItemModal>

                {/* UPDATE ITEM MODAL */}
                <UpdateItemModal
                    isOpen={showModalEdit}
                    onClose={() => {
                        setShowModalEdit(false)
                    }}
                    onSubmit={(payload) => {
                        // @ts-ignore
                        (item? item : itemList)[key] = payload
                        setShowModalEdit(false)
                    }}
                    // @ts-ignore
                    payload={ item ? item[key] : undefined}
                ></UpdateItemModal>

                {/* DELETE ITEM MODAL */}
                <DeleteItemModal
                    isOpen={showModalDelete}
                    onClose={() => {
                        setShowModalDelete(false)
                    }}
                    onSubmit={() => {
                        if (item) {
                            if (item[key].IsNew == undefined) {
                                if (deleteData.length > 0) {
                                    DeleteTemp = deleteData
                                    DeleteTemp.push(item[key])
                                } else {
                                    DeleteTemp.push(item[key])
                                }
                                setDeleteData(DeleteTemp)
                            }
                            item.splice(key, 1)
                        } else {
                            // @ts-ignore
                            if (itemList[key].IsNew == undefined) {
                                if (deleteData.length > 0) {
                                    DeleteTemp = deleteData
                                    // @ts-ignore
                                    DeleteTemp.push(itemList[key])
                                } else {
                                    // @ts-ignore  
                                    DeleteTemp.push(itemList[key])
                                }
                                setDeleteData(DeleteTemp)
                            } 
                            itemList?.splice(key, 1)
                        }
                        setShowModalDelete(false)
                    }}
                ></DeleteItemModal>

                {/* CONFIRM MODAL */}
                <ConfirmItemModal
                    isOpen={showModalConfirm}
                    onClose={() => {
                        setShowModalConfirm(false)
                    }}
                    onSubmit={() => {
                        let data = (item ? item : itemList)
                        // DELETE DATA
                        for (let index = 0; index < deleteData.length; index++) {
                            //@ts-ignore
                            DeleteItemPost.mutate(deleteData[index])
                        }

                        // UPDATE & ADD ITEM DATA
                        //@ts-ignore
                        for (let index = 0; index < data.length; index++) {
                            // @ts-ignore
                            if (data[index].IsNew == 1) {
                                //@ts-ignore
                                AddItemPost.mutate(data[index])
                            }  
                            // @ts-ignore
                            if (data[index].IsUpdate == 1) {
                                //@ts-ignore
                                UpdateItemPost.mutate(data[index])
                            }                         
                        }

                        //@ts-ignore
                        navigation.navigate('Home', {})
                        itemList = []
                        setitem([])
                        setDeleteData([])
                    }}
                ></ConfirmItemModal>

                {/* MODAL DATE */}
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
        </LoadingOverlay>
  )
}

export default OrderContent
