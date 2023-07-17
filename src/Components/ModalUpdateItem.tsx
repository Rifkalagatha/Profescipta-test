import { Box, Button, Center, Heading, HStack, Icon, Image, Input, Modal, ScrollView, Select, Text, useDisclose, useTheme, VStack } from 'native-base'
import { COLORS } from '../constants'
import { ImageBackground, Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState, useEffect, useMemo } from 'react'
import { UpdateItemVariables } from '../Data/UpdateItem/useUpdateItem'




type ModalUpdateItemProps = {
    isOpen? : boolean
    onClose?: () => void
    onSubmit?: (payload:UpdateItemVariables) => void
    onName?: (value: string) => void
    payload?: UpdateItemVariables


}

function UpdateItemModal({
    isOpen,
    onClose,
    onSubmit,
    onName,
    payload,
}: ModalUpdateItemProps) {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [qty, setqty] = useState(0);

    // console.log(payload, "ini payload modal")
    // if (payload) {
    //     setname(payload.ItemName)
    // }

    useEffect(() => {
        if (payload) {
            setname(payload.ItemName)
            setprice(payload.Price.toString())
            setqty(payload.Quantity)
        }
    }, [payload])

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            _backdropFade={{
                onTouchEndCapture(event) {
                 
                },
                // @ts-ignore
                animate: { opacity: 1, transition: { duration: 100 } },
                exit: { opacity: 0, transition: { duration: 100 } },
              }}
              _fade={{
                // @ts-ignore
                animate: { opacity: 1, transition: { duration: 100 } },
                exit: { opacity: 0, transition: { duration: 100 } },
              }}
            _backdrop={{
                _dark: {
                    bg: "#55534D"
                },
            bg: "warmGray.50"
            }}>
                <Modal.Content maxW={'320px'} maxH="500">
                <Modal.CloseButton />
                <Modal.Body>
                    <VStack space={2}>
                        <Center mb={5}>
                            <Text bold fontSize={'xl'}>Update Item</Text>
                        </Center>
                        <Text bold>Item Name</Text>
                        <Input
                            onChangeText={text => setname(text) }
                            value={name}
                            focusOutlineColor={COLORS.primary}
                            placeholder={'Sales Order Name ...'}

                        ></Input>
                        <Text bold>Price</Text>
                        <Input
                            keyboardType={'number-pad'}
                            onChangeText={text => setprice(text) }
                            value={price.toString()}
                            focusOutlineColor={COLORS.primary}
                            placeholder={'Sales Order Price ...'}
                        ></Input>
                        <HStack >
                            <Text bold>QTY</Text>
                            <Input
                            value={qty.toString()}
                            w={'40%'}
                            ml={'25%'} h={7}  
                                isDisabled={true}
                                _disabled={{
                                    opacity: 1
                                }}
                                // @ts-ignore
                                value={qty.toString()} 
                                backgroundColor={'#D9D9D9'} rounded={30} 
                                InputLeftElement={
                                    <Pressable onPress={() => {
                                        setqty(qty -1)
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
                                        setqty(qty+1)

                                    } }>
                                        <Icon 
                                            m={1}
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
                        </HStack>
                        <HStack mt={5} mb={5} justifyContent={'space-between'}>
                            <Text bold>Total :</Text>
                            <Text bold>{Number(price) * qty}</Text>
                        </HStack>
                        <HStack m={2} justifyContent={'center'} space={5}>
                      <Button
                       isDisabled={qty<=0 || price=='' || name == ''}
                       _disabled={{
                           opacity: 0.5
                       }}
                        onPress={(e) => {
                            if ( onSubmit) {
                                const d = new Date();
                                let unique = d.valueOf();
                              onSubmit({
                                ItemId : payload?.IsNew? unique :Number(payload?.ItemId),
                                OrderId: 0,
                                ItemName: name,
                                Quantity: qty,
                                Price:Number(price),
                                IsUpdate: payload?.IsNew? 0 : 1,
                                IsNew: payload?.IsNew || 0
                              })
                            } 
                          }}
                        bgColor={COLORS.primary}
                        size={'xs'}
                        w='30%' h='7' rounded={'25'}>Save</Button>
                      <Button
                        bgColor={'white'}
                        _text={{ color: 'black' }}
                        borderWidth={1}
                        borderColor={COLORS.primary}
                        size={'xs'}
                        w='30%' h='7' rounded={'25'}
                        onPress={onClose}
                        >Cancel</Button>
                    </HStack>
                    </VStack>
                </Modal.Body>
                </Modal.Content>
            </Modal>
    )
}

export default UpdateItemModal