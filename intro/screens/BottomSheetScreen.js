import React, { useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const bottomSheetRef = useRef(null);
  const snap = useMemo(() => [1, '25%', '50%'], []);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <View style={styles.container}>
        <Button title='Abrir' onPress={openSheet} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snap}
        enablePanDownToClose={true}
        backgroundStyle={styles.BSheet}>
        <BottomSheetView style={styles.BView}>
          <Text style={styles.BText}>BottomSheet</Text>
          <Image style={styles.IMG} source={require('../assets/63706.webp')} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BSheet: {
    backgroundColor: '#840081ff',
  },
  BView: {
    flex: 1,
    alignItems: 'center',
  },
  IMG: {
    marginTop: 50,
    height: 200,
    width: 200,
  },
  BText: {
    fontSize: 50,
  },
});
