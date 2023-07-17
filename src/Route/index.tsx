import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StackNavigator } from '@src/navigation/_navigator'

import Home from '../Screens/Home';
import Order from '../Screens/Order';


const Stack = createNativeStackNavigator();


const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Home" component={Home} options={{headerShown : false, }} />
      <Stack.Screen name="Order" component={Order} options={{headerShown : false, animationTypeForReplace: 'push', animation:'none'}} />
    </Stack.Navigator>
  )
}

export default Route
