import { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function InsertUsuarioScreen() {

  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
const [editandoNombre, setEditandoNombre] = useState("");


  //Cargar usuarios desde la BD
  const cargarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await controller.obtenerUsuarios();
      setUsuarios(data);
      console.log(`${data.length} Usuarios cargados`);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //inicializar y cargar datos
  useEffect(() => {
    const init = async () => {
      await controller.initialize();
      await cargarUsuarios();
    };

    init();

    controller.addListener(cargarUsuarios);

    return () => {
  controller.removeListener(cargarUsuarios);
};

  }, [cargarUsuarios]);

  // Agregar nuevo usuario
  const handleAgregar = async () => {
    if (guardando) return;
    try {
      setGuardando(true);
      const usuarioCreado = await controller.crearUsuario(nombre);
      Alert.alert('Usuario Creado', `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
      setNombre('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };
  const confirmarEdicion = (id, nombreActual) => {
  if (Platform.OS === "web") {
    if (confirm(`¿Seguro que quieres editar a "${nombreActual}"?`)) {
      setEditandoId(id);
      setEditandoNombre(nombreActual);
    }
    return;
  }

  Alert.alert(
    "Confirmar edición",
    `¿Seguro que quieres editar a "${nombreActual}"?`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, editar",
        onPress: () => {
          setEditandoId(id);
          setEditandoNombre(nombreActual);
        },
      },
    ]
  );
};

  const confirmar = async (mensaje) => {
  if (Platform.OS === "web") {
    return window.confirm(mensaje);
  } else {
    return await new Promise((resolve) => {
      Alert.alert(
        "Confirmación",
        mensaje,
        [
          { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
          { text: "Sí", onPress: () => resolve(true) }
        ]
      );
    });
  }
};

const handleEliminar = async (id) => {
  const seguro = await confirmar("¿Estás seguro de eliminar este usuario?");

  if (!seguro) return;

  try {
    await controller.eliminarUsuario(id);
    if (Platform.OS === "web") {
      alert("Usuario eliminado");   
    } else {
      Alert.alert("Eliminado", "Usuario eliminado correctamente");
    }
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};
const handleEditar = async (id, nombreActual) => {
  if (Platform.OS === "web") {
    const nuevoNombre = prompt("Editar nombre:", nombreActual);

    if (!nuevoNombre || nuevoNombre.trim() === "") return;

    try {
      await controller.actualizarUsuario(id, nuevoNombre.trim());
      alert("Usuario actualizado");
    } catch (error) {
      alert(error.message);
    }

    return;
  }

  // ANDROID - PANTALLA PEQUEÑA: usar un input en Alert manual
  let nuevoNombre = nombreActual;

  Alert.alert(
    "Editar Usuario",
    "Escribe el nuevo nombre en el campo que aparece abajo",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Guardar",
        onPress: async () => {
          try {
            await controller.actualizarUsuario(id, nuevoNombre.trim());
            Alert.alert("Actualizado", "Usuario editado correctamente");
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ],
    {
      cancelable: true,
    }
  );
};




  const renderUsuario = ({ item, index }) => (
  <View style={styles.userItem}>
    <View style={styles.userNumber}>
      <Text style={styles.userNumberText}>{index + 1}</Text>
    </View>

    <View style={styles.userInfo}>

      {editandoId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editandoNombre}
            onChangeText={setEditandoNombre}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              await controller.actualizarUsuario(item.id, editandoNombre);
              setEditandoId(null);
            }}
          >
            <Text style={styles.editButtonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setEditandoId(null)}
          >
            <Text style={styles.deleteButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.userName}>{item.nombre}</Text>
          <Text style={styles.userId}>{item.id}</Text>

          <TouchableOpacity
             style={styles.editButton}
            onPress={() => confirmarEdicion(item.id, item.nombre)}
          > 

            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleEliminar(item.id)}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
);


  return (

    <View style={styles.container}>

      <Text style={styles.title}> INSERT & SELECT</Text>
      <Text style={styles.subtitle}>
        {Platform.OS === 'web' ? ' WEB (LocalStorage)' : ` ${Platform.OS.toUpperCase()} (SQLite)`}
      </Text>

      <View style={styles.insertSection}>
        <Text style={styles.sectionTitle}> Insertar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
          editable={!guardando}
        />

        <TouchableOpacity
          style={[styles.button, guardando && styles.buttonDisabled]}
          onPress={ handleAgregar }
          disabled={guardando} >

          <Text style={styles.buttonText}>
            {guardando ? ' Guardando...' : 'Agregar Usuario'}
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.selectSection}>

        <View style={styles.selectHeader}>

          <Text style={styles.sectionTitle}>Lista de Usuarios</Text>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={ cargarUsuarios } >
            <Text style={styles.refreshText}>Recargar</Text>
          </TouchableOpacity>

        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando usuarios...</Text>
          </View>
        ) : (
          <FlatList
            data={ usuarios }
            keyExtractor={(item) => item.id.toString()}
            renderItem={ renderUsuario }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}> No hay usuarios</Text>
                <Text style={styles.emptySubtext}>Agrega el primero arriba</Text>
              </View>
            }
            contentContainerStyle={usuarios.length === 0 && styles.emptyList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  insertSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    padding: 8,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  userNumber: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
  mvcInfo: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  mvcTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  mvcText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  deleteButton: {
  backgroundColor: '#FF3B30',  
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 6,
  alignSelf: 'flex-start',
  marginTop: 10,
},
deleteButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
},
  UpdateButtonButton: {
  backgroundColor: '#9eff30ff', 
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 6,
  alignSelf: 'flex-start',
  marginTop: 10,
},
editButton: {
  backgroundColor: '#FFA500',
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 6,
  alignSelf: 'flex-start',
  marginTop: 10,
  marginRight: 10,
},
editButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
},


});