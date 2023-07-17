import React, { useEffect, useState } from 'react'

import { VStack } from 'native-base'

import { COLORS } from '../../constants'
import Content from '../../Components/Home/Content'
import Header from '../../Components/Header'


const Home = () => {
  
    return (
        <VStack space={4} bgColor={COLORS.primary} safeAreaTop >
            <Header name="Sales Order List"></Header>
            <Content></Content>
        </VStack>
    )
}

export default Home
