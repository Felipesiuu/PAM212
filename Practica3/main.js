import { restar } from './utils.js';

console.log(restar(2, 3));
console.log(restar(10, 4));
console.log(restar(82, 23));
console.log(restar(13, 12));
console.log(restar(24, 23));


function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin") 
            {
            resolve("Acceso concedido");
        } else 
        {
             reject("Acceso denegado");
        }
  });
}
 verificarUsuario("admin")
    .then(res => console.log(res))// Acesso concedido
    .catch(err => console.error(err));

verificarUsuario("Ivan")
    .then(res => console.log(res))
    .catch(err => console.error(err)); // Acesso denegado


//Ejercicio 3
function simularAPI(){
    return new Promise (resolve => {
        setTimeout(()  =>{
            resolve("Datos recibidos");
        },5000);
    });
} 

async function ObtenerDatos() {
        try {
        const resultado = await simularAPI(); 
        console.log(resultado); 
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
    ObtenerDatos();