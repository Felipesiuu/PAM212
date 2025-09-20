//Ejercicio 1
const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion:{
        ciudad:"Qro",
        pais:"MX"
    }
};

const{nombre, edad, direccion:{ciudad, pais}} = persona;

console.log("Me llamo "+ nombre+", tengo " + edad + " años y vivo en " + ciudad +".");

// Ejercicio 2
const productos = [
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250},
    { nombre: "Teclado", precio: 750 },
    { nombre: "Monitor", precio: 3000 },
];

const nombres= productos
.filter(producto => producto.precio > 1000)
.map(producto => producto.nombre);
console.log(nombres);


// Ejercicio 3
const personas = [
  { nombre: "Ana", edad: 22 },
  { nombre: "Luis", edad: 35 },
  { nombre: "María", edad: 28 }
];

const personaLuis = personas
.find(persona => persona.nombre === "Luis")
console.log(personaLuis);

personas.forEach(persona => {
  console.log(persona.nombre + " tiene " + persona.edad +  " años");
});

const totalEdades = personas.reduce((acumulador, persona) => acumulador + persona.edad,  0);
console.log("Suma de edades", totalEdades);


