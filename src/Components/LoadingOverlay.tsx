import React, { ReactNode } from 'react'
import { Spinner, Text, View } from 'native-base'
import { COLORS } from '../constants'

type LoadingOverlayProps = {
  show?: boolean
  loadingText?: string
  children: ReactNode
}

function LoadingOverlay({
  loadingText = 'Loading...',
  show,
  children,
}: LoadingOverlayProps) {
  return (
    <>
      {children}
      {show && (
        <View
          top={0}
          right={0}
          left={0}
          bottom={0}
          position={'absolute'}
          justifyContent={'center'}
          alignItems={'center'}
          zIndex={1000}
        >
          <View
            w={'full'}
            h={'full'}
            bgColor={'gray.500'}
            opacity={0.5}
            position={'absolute'}
          />
          <Spinner size={'lg'} color={COLORS.primary} />
          <Text fontSize={'lg'}>{loadingText}</Text>
        </View>
      )}
    </>
  )
}

export default LoadingOverlay
