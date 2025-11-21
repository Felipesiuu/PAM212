import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, View, Pressable } from 'react-native';


export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={28} color="green" />
        <Text style={styles.title}>Perfil de Usuario</Text>
      </View>

    <Pressable style={[styles.button, styles.buttonSettings]} 
    onPress={() => navigation.navigate('Detalle')}>

        <Text style={{ fontSize: 18, color: "black" }}>
          Ir a Detalles de Usuario
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
   button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },

  buttonSettings: {
    backgroundColor: '#FF8800', // Naranja
  },
});
