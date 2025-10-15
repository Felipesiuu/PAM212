//1. Import: Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button } from 'react-native';
import React,{useState} from 'react';

// 2. Main: Zona de componentes 
export default function App() {

  const[contador, setContador] = useState(0);

  return (

    <View style={styles.container}>

      <Text style={styles.Texto}>Contador:</Text>
      <Text style={styles.Texto2}> {contador} </Text>

      <View style={styles.contendorBotones}>

        <Button color = "green" title='Incrementar' onPress={() => setContador(contador + 1)}></Button>
        <Button color = "red" title='Quitar' onPress={() => setContador(contador - 1)}></Button>
          <Button color = "blue" title='Reinicar' onPress={() => setContador(0)}></Button>
          <StatusBar style="auto" />
      </View>

      <StatusBar style="auto" />
    </View>

  );
}



// 3. Estilos: Zona de estilos 
const styles = StyleSheet.create({
  container: {
    flex: 1, // Reparatir los espacios
    backgroundColor: '#0782ceff', // Le da el color objeto
    alignItems: 'center',// mueve los compontenes horizontalmente 
    justifyContent: 'center',// Mueve los componentes verticalmente
  },
  Texto:{
    color:  '#5aed20ff',// Color de las letras
    fontSize: 30,// Tamaño de las letras
    fontFamily: 'Times New Roman', // Tipo de letra 
    fontWeight: 'bold', // Delineado y en negrias
    fontStyle: 'italic', // para que las letras esten inclinadas
    textDecorationLine: 'line-through',// Una linea entre las letras 
  },
    Texto2:{
    color:  '#170ec7ff',
    fontSize: 40,
    fontFamily:'Courier',  
    fontWeight:'400', 
    textDecorationLine: 'underline',
  },
  contendorBotones:{
    marginTop:15,// Crea un margen
    flexDirection:'row',// para alinear los objetos
    gap:20, // Asigna espacios para que de distribuyan

  },
});
