import React from 'react'
import { Box, Button, Center, Heading, HStack, Icon, Image, Input, ScrollView, Text, useDisclose, useTheme, VStack } from 'native-base'

type NameProps = {
    name: string;
  };

const Header = (props:NameProps) => {

  return (
    <VStack m='3'>
        <HStack  space={10} justifyContent={"space-between"} >
            <VStack justifyContent={"center"} >
                <Image source={require('../Assets/Ellipse.png')} alt="Profile" />
            </VStack>
            <VStack justifyContent={"center"} >
                <Image source={require('../Assets/Burger.png')} alt="Burger" />
            </VStack>
        </HStack>
        <VStack mt='2'>
                <Text  bold color={'white'} fontSize="3xl" fontFamily={'Poppins'}>{props.name}</Text>
        </VStack>
    </VStack>
  )
}

export default Header
