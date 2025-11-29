import { Usuario } from '../models/usuario';
import DatabaseService from '../database/DatabaseService';
import { Platform } from "react-native";


export class UsuarioController {
    constructor() {
        this.listeners = [];
    }

    // Inicializar el controlador con el Service
    async initialize() {
        await DatabaseService.initialize();
    }

    // Obtener usuarios desde la base de datos
    async obtenerUsuarios() {
        try {
            const data = await DatabaseService.getAll();
            return data.map(u => new Usuario(u.id, u.nombre, u.fecha_creacion));
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw new Error('No se pudieron cargar los usuarios');
        }
    }

    async actualizarUsuario(id, nuevoNombre) {
  try {
    if (!nuevoNombre || nuevoNombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    await DatabaseService.actualizarUsuario(id, nuevoNombre.trim());

    // Aquí sí se refresca la UI
    this.notifyListeners();

    return true;

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
}
 async eliminarUsuario(id) {
  try {
    await DatabaseService.delete(id);

    // Actualiza la UI después de eliminar
    this.notifyListeners();
    return true;

  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw new Error("No se pudo eliminar el usuario");
  }
}





    // Crear usuario nuevo
    async crearUsuario(nombre) {
        try {
            // 1. Validar datos
            Usuario.validar(nombre);

            // 2. Insertar en BD
            const nuevoUsuario = await DatabaseService.add(nombre.trim());

            // 3. Notificar a los observadores
            this.notifyListeners();

            // 4. Retornar usuario creado
            return new Usuario(
                nuevoUsuario.id,
                nuevoUsuario.nombre,
                nuevoUsuario.fecha_creacion
            );

        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    //   Sistema de Observadores (MVC)

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}