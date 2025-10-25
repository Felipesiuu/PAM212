import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ContadorScrenn from './ContadorScrenn';
import BotonesScreen from './BotonAndSwitch/BotonesScreen';
import { Button } from 'react-native';
import TextInpuntAlertScreen from './TextInpuntAlertScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ScrollViewScreen1 from './ScrolleViewScreen1';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';
import Repaso from './Repaso1';


export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');
  console.log('Renderizando pantalla:', screen);
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
        case 'Horizontal':
            return  <ScrollViewScreen1/>
        case 'activityindicator':
             return <ActivityIndicatorScreen/>
        case 'flatlist':
             return <FlatListScreen/>
        case 'modal':
            return <ModalScreen/>
        case 'bottom sheet':
            return  <BottomSheetScreen/>
        case 'Repaso 1':
            return  <Repaso/>
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
                        <Button onPress={()=>setScreen('Horizontal')} title ='Pract:scrollView horizontal'/>
                        <Button onPress={()=>setScreen('flatlist')} title ='Pract:flatlist'/>
                        <Button onPress={()=>setScreen('modal')} title ='Pract:modal'/>
                        <Button onPress={()=>setScreen('bottom sheet')} title ='Pract:button sheet'/> 
                        <Button onPress={()=>setScreen('Repaso 1')} title ='Repaso'/>
                    </View>
                )

    }
}

const styles = StyleSheet.create({})
