import React from "react";
import { NativeBaseProvider, Box, extendTheme, Text } from "native-base";
import { COLORS } from "./constants";

import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from "react-native"
import Route from "./Route";
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './Redux/store';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()




// IGNORE WARNING ERROR LOG BOX
LogBox.ignoreLogs([
'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])

const nativeBaseTheme = extendTheme({
  colors: {
    // Add new color
    checkbox: {
      600: '#4789D8',
    },
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: COLORS.primary,
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
  },
})

export default function App() {
  return (
    <ReduxProvider {...{ store }}>

    <NativeBaseProvider
    theme={nativeBaseTheme}
    initialWindowMetrics={
      process.env.NODE_ENV === 'test'
        ? {
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }
        : undefined
    }>
       {/* <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}> */}

       <QueryClientProvider client={queryClient}>

      <NavigationContainer>
        <Route></Route>
      </NavigationContainer>
      </QueryClientProvider>

    {/* </PersistGate> */}

    </NativeBaseProvider>
    </ReduxProvider>

  );
}