import { Text, StyleSheet, View } from 'react-native'
import SwitchButton from './SwitchScreen'
// Importamos nuestro componente SwitchButton para usarlo en cada opción de configuración

export default function BotonesScreen() {
  // Array de información de configuración
  // Cada objeto tiene:
  // id -> identificador único
  // title -> texto que se mostrará
  // value -> valor inicial del switch (true = ON, false = OFF)
  const info = [
    {
      id: 1,
      title: 'Mantener la pantalla encendida',
      value: false
    },
    {
      id: 2,
      title: 'Ajustar brillo automático',
      value: true
    },
      {
      id: 3,
      title: 'WiFi',
      value: false
    },
    {
      id: 4,
      title: 'Bluetooth',
      value: false
    }
  ]

  // Componente que representa cada item de configuración
  // Recibe props: title y value
  const Item = ({ title, value }) => {
    return (
      <View style={styles.item}>
        {/* Caja del título */}
        <View style={styles.itemBox}>
          <Text style={styles.itemtitle}>{title}</Text>
        </View>
        {/* Caja del switch */}
        <View style={styles.switch}>
          <SwitchButton temporal={value} isButton={true} />
          {/* temporal = valor inicial del switch
              isButton = true para que sea interactivo */}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Encabezado de la pantalla */}
      <View style={styles.Encabezado}>
        <Text style={styles.EncabezadoTitle}> Configuración </Text>
      </View>

      {/* Contenedor principal de los items */}
      <View style={styles.footer}>
        {
          // Recorremos el array info y renderizamos un Item por cada objeto
          info.map(x =>
            <Item key={x.id} title={x.title} value={x.value} />
          )
        }
        {/* Texto adicional, podría ser un footer o nota */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // ocupa toda la pantalla
    justifyContent: 'center',
    alignContent: 'center'
  },
  Encabezado: {
    height: 75,              // altura del encabezado
    alignSelf: 'stretch',    // ocupa todo el ancho
    flexDirection: 'row',    // los elementos dentro se organizan horizontalmente
    justifyContent: 'flex-start', // alineamos al inicio
    alignContent: 'center',
    paddingHorizontal: 18    // espacio lateral
  },
  EncabezadoTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#383838',
    marginLeft: 10
  },
  footer: {
    flex: 1,                 // ocupa el resto del espacio
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 20
  },
  item: {
    height: 55,              // altura de cada item
    alignSelf: 'stretch',
    flexDirection: 'row',    // organizamos título y switch horizontalmente
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemBox: {
    height: 100,             // altura interna
    flex: 1,                 // ocupa todo el espacio horizontal disponible
    justifyContent: 'center',
    alignItems: 'flex-start' // texto alineado a la izquierda
  },
  itemtitle: {
    fontSize: 15,
    fontWeight: '300',
    color: '#383838'
  },
  switch: {
    width: 70,               // ancho del contenedor del switch
    height: '100%',          // ocupa toda la altura del item
    justifyContent: 'center',
    alignItems: 'center'
  }
})
      