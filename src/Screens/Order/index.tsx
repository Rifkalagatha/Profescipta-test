import { Box, VStack } from 'native-base'
import React from 'react'
import Header from '../../Components/Header'
import OrderContent from '../../Components/OrderContent'
import { COLORS } from '../../constants'

const Order = () => {
  return (
   <VStack space={4} bgColor={COLORS.primary} safeAreaTop >
      <Header name="Sales Order Input"></Header>
      <OrderContent></OrderContent>
    </VStack>
  )
}

export default Order
