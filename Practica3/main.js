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