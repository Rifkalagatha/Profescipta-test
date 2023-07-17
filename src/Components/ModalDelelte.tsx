import { Box, Button, Center, Heading, HStack, Icon, Image, Input, Modal, ScrollView, Select, Text, useDisclose, useTheme, VStack } from 'native-base'
import { COLORS } from '../constants'
import { ImageBackground, Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RedAlert from '../Assets/RedAlert'



type ModalDeleteItemProps = {
    isOpen? : boolean
    onClose?: () => void
    onSubmit?: () => void

}

function DeleteItemModal({
    isOpen,
    onClose,
    onSubmit,
}: ModalDeleteItemProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} _backdrop={{
            _dark: {
              bg: "coolGray.800"
            },
            bg: "warmGray.50"
          }}>
              <Modal.Content  maxW={'320px'} maxH="500">
                <Modal.CloseButton />
                <Modal.Body>
                  <VStack m={5} space={5}>
                      <Center>
                          <RedAlert></RedAlert>
                          <Text mt={5} bold fontSize={'xs'}>Are you sure wants to delete this item ?</Text>
                          <HStack mt={5} m={2} justifyContent={'center'} space={5} >
                              <Button
                                  onPress={onSubmit}
                                  bgColor={COLORS.primary}
                                  size={'xs'}
                                  w='30%' h='7' rounded={'25'}>Yes</Button>
                              <Button
                                  onPress={onClose}
                                  bgColor={'white'}
                                  _text={{ color: 'black' }}
                                  borderWidth={1}
                                  borderColor={COLORS.primary}
                                  size={'xs'}
                                  w='30%' h='7' rounded={'25'}
                                  >No</Button>
                          </HStack>
                      </Center>
                      
                  </VStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
    )

}

export default DeleteItemModal