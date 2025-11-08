import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native-web';

const alumnos = [
  { id: '1', nombre: 'Rafa' },
  { id: '2', nombre: 'Fer' },
  { id: '3', nombre: 'Emily' },
  { id: '4', nombre: 'Cris' },
  { id: '5', nombre: 'David' },
];

const categorias = [
  {
    titulo: 'Deportes',
    data: ['Futbol', 'basquetball'],
    
  },
  {
    titulo: 'Entretenimiento',
    data: ['Junio', 'Julio', 'Agosto'],
  },
  {
    titulo: 'Tecnología',
    data: ['Septiembre', 'Octubre', 'Noviembre'],
  },
];

const SimpleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Noticias de última hora</Text>
    </View>
  );
};

const SimpleScrollView = () => {
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categorias.map((cat, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.subtitle}>{cat.titulo}</Text>
             <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>* {item.nombre}</Text>
          </View>
        )}
      />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SimpleScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: '#4796ceff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  card: {
    width: 500,
    height: 150,
    backgroundColor: '#E6DDC4',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
    fontSize: 18, 
  },
    itemBox: {
    backgroundColor: '#1e1e1e',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
   itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
