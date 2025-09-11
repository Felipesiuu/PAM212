// Operaciones
// Con numeros 
let numberOne = 60 ;
let numberTwo = 100;

let result = numberOne + numberTwo;

console.log(result);

//string  
let names = "Felipe";
let lastname = "Munguia";
// Concatenación
let name = names + " " + lastname;
console.log(name);


// Comparación 
// Puedes usar cualquier tipo de operadad 
let result1 = numberOne > numberTwo;
console.log(result1);


let contra = "pepe";
let input = "pepe1";

let comprueba = input ==  contra;
 
// Validar datos 
if (comprueba == true)
{
    console.log("La contraseña es correcta");
}
else 
{
    console.log("Contraseña incorrecta");
}

let score = 10;
if (score > 30)
{
    console.log("Eres bueno");
}else if (score > 15)
{
    console.log("Tienes que mejorar");
}
else 
{
    console.log("Necesitas practicar");
}


// Manejo de switch

let tarjeta = "Debito"

switch(tarjeta)
{
    case "Debito":
        console.log("Esta es una tarjeta de debito");
        break;
    case "Credito":
        console.log ("Esta es una tarjeta de credito");
        break;
    default:
        console.log ("No tienes tarjeta");
}