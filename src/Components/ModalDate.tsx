import { Box, Button, Center, Heading, HStack, Icon, Image, Input, Modal, ScrollView, Select, Text, useDisclose, useTheme, VStack } from 'native-base'
import { COLORS } from '../constants'
import { ImageBackground, Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DatePickerModal } from 'react-native-paper-dates'
import React, { useEffect, useState } from 'react'



type ModalDateProps = {
    isOpen : boolean
    onClose?: () => void
    onConfirm?: (payload:any) => void
}

function ModalDate({
    isOpen,
    onClose,
    onConfirm,
}:ModalDateProps) {
    const [date, setDate] = React.useState("");


    const onConfirmSingle = React.useCallback(
        (params:any) => {
          setDate(params.date);
          // @ts-ignore
          onConfirm(params.date)
          
        },
        [ setDate]
    );

    return (
        <DatePickerModal
        locale="en"
        mode="single"
        visible={isOpen}
        // @ts-ignore
        onDismiss={onClose}
        // @ts-ignore
        onConfirm={onConfirmSingle}
        />
    )
}

export default ModalDate