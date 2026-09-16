// Challenge-01

// Función Normal
function ParOImparNormal(numero) {
  if (numero % 2 === 0) {
    console.log(`${numero} es PAR`);
  } else {
    console.log(`${numero} es IMPAR`);
  }
}

// Función Flecha 
const ParOImparFlecha = (numero) => {
  if (numero % 2 === 0) {
    console.log(`${numero} es PAR`);
  } else {
    console.log(`${numero} es IMPAR`);
  }
}

// Pruebas

console.log("Probando Función Normal:");
ParOImparNormal(14);
ParOImparNormal(7);

console.log("Probando Función Flecha:");
ParOImparFlecha(73);
ParOImparFlecha(80);
