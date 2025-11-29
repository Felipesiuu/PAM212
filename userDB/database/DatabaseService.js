import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.storageKey = 'usuarios';
    }

    // Inicializa la base de datos dependiendo de la plataforma (web o móvil)
    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage para web');
        } else {
            console.log('Usando SQLite para móvil');
            this.db = await SQLite.openDatabaseAsync('miapp.db');

            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
        }
    }

    // Obtener todos los usuarios
    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } else {
            return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC');
        }
    }

    // Agregar un nuevo usuario
    async add(nombre) {
        if (Platform.OS === 'web') {
            const usuarios = await this.getAll();

            const nuevoUsuario = {
                id: Date.now(),
                nombre,
                fecha_creacion: new Date().toISOString()
            };

            usuarios.unshift(nuevoUsuario);
            localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
            return nuevoUsuario;

        } else {
            const result = await this.db.runAsync(
                'INSERT INTO usuarios(nombre) VALUES(?)',
                nombre
            );

            return {
                id: result.lastInsertRowId,
                nombre,
                fecha_creacion: new Date().toISOString()
            };
        }
    }
    async delete(id) {
  if (Platform.OS === "web") {
    let usuarios = await this.getAll();
    usuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
    return true;
  }

 await this.db.runAsync(
  "DELETE FROM usuarios WHERE id = ?",
  [id]   // <<< ASÍ SÍ FUNCIONA
);

  return true;
}

 async actualizarUsuario(id, nuevoNombre) {
  if (Platform.OS === "web") {
    let usuarios = await this.getAll();
    usuarios = usuarios.map(u =>
      u.id === id ? { ...u, nombre: nuevoNombre } : u
    );
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  } else {
    await this.db.runAsync(
      `UPDATE usuarios SET nombre = ? WHERE id = ?`,
      [nuevoNombre, id]
    );
  }

  return true;
}


}

// Exportar instancia única
export default new DatabaseService();