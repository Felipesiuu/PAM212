import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ContadorScrenn from './ContadorScrenn';
import BotonesScreen from './BotonesScreen';
import { Button } from 'react-native-web';
import TextInpuntAlertScreen from './TextInpuntAlertScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';


export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch(screen){
        case 'contador':
            return <ContadorScrenn/>
        case 'botones':
            return  <BotonesScreen/>
        case 'text input':
            return <TextInpuntAlertScreen/>
        case 'imagen back':
            return <ImageBackgroungScreen/>
        case 'scrollView':
             return <ScrollViewScreen/>
        case 'activityindicator':
             return <ActivityIndicatorScreen/>
        case 'flatlist':
             return <FlatListScreen/>
        case 'modal':
            return <ModalScreen/>
        case 'bottom sheet':
            return  <BottomSheetScreen/>
        case 'menu':
            default:
                return (
                    <View>
                        <Text> Menu de Practicas </Text>
                        <Button onPress={()=>setScreen('contador')} title ='Pract:Contador'/> 
                        <Button onPress={()=>setScreen('botones')} title ='Pract:Botones'/>
                        <Button onPress={()=>setScreen('text input')} title ='Pract:text input'/>
                        <Button onPress={()=>setScreen('imagen back')} title ='Pract:imagen back'/>
                        <Button onPress={()=>setScreen('scrollView')} title ='Pract:scrollView'/>
                        <Button onPress={()=>setScreen('flatlist')} title ='Pract:flatlist'/>
                        <Button onPress={()=>setScreen('modal')} title ='Pract:modal'/>
                        <Button onPress={()=>setScreen('bottom sheet')} title ='Pract:button sheet'/>
                        
                    </View>
                )

    }
}

const styles = StyleSheet.create({})
