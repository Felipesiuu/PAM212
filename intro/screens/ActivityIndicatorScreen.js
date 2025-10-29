import { Text, StyleSheet, View, Button,ActivityIndicator, TextComponent } from 'react-native'
import React, { Component, useState } from 'react'

export default function ActivityIndicatorScreen () {
  const [cargando, setCargando] = useState (false);

  const iniciarCarga = () => {setCargando(true); setTimeout(() =>  setCargando(false),3000)}

  const detenerCarga = () => {setCargando(false);};

  return(
  <View style = {styles.container}>
    <Text style = {styles.title}> Práctica: ActivityIndicator</Text>
      <View style = {styles.boton}>
          <Button color = 'green'
           title = {cargando ? 'cargando...' : 'iniciar carga'}
           onPress={iniciarCarga}
          />
      </View>
       <View style = {styles.boton}>
          <Button color =  'red'
          title = 'Detener carga'
          onPress={detenerCarga}
           />
       </View>
       <View style = {styles.carga}>
        <ActivityIndicator size = 'large'
        color = 'black'
        animating = {cargando}
        hidesWhenStopped = {true}
        />
        <Text  style = {styles.textoCarga}>
            {cargando ? 'Cargando datos...' : 'preciona el boton'}
        </Text>
       </View>
      </View>

  )

}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
},
texto: {
    color: "#000000ff",
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 20,
},
boton: {
    width: 220,
    marginBottom: 16,
},
carga: {
    alignItems: 'center',
    marginTop: 20,
},
textoCarga: {
    marginTop: 12,
    fontSize: 16,
    color: '#000000',
},
});