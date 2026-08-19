/*
FUNCIONES DE ARRAY EN JAVASCRIPT

Juan Steban Burbano
*/

// 1. length
// Sirve para saber cuántos elementos hay dentro de un array.
// Ejemplo:
let frutas = ["manzana", "pera", "uva"];
console.log(frutas.length); // 3


// 2. at()
// Sirve para obtener un elemento usando su posición.
// La primera posición es 0.
// Ejemplo:
let numeros = [10, 20, 30];
console.log(numeros.at(1)); // 20


// 3. concat()
// Sirve para unir dos o más arrays en uno nuevo.
// No cambia los arrays originales.
// Ejemplo:
let primero = [1, 2];
let segundo = [3, 4];
console.log(primero.concat(segundo)); // [1, 2, 3, 4]


// 4. copyWithin()
// Copia algunos elementos y los coloca en otra posición
// dentro del mismo array.
// Ejemplo:
let valores = [1, 2, 3, 4];
valores.copyWithin(1, 2);
console.log(valores); // [1, 3, 4, 4]


// 5. entries()
// Muestra cada elemento junto con su posición.
// La posición aparece primero y el valor después.
// Ejemplo:
let colores = ["rojo", "azul"];
console.log([...colores.entries()]);  // [[0, "rojo"], [1, "azul"]]


// 6. every()
// Revisa si todos los elementos cumplen una condición.
// Devuelve true si todos la cumplen y false si alguno no la cumple.
// Ejemplo:
let edades = [20, 25, 30];
console.log(edades.every(edad => edad >= 18)); // true


// 7. fill()
// Cambia varios elementos del array por el mismo valor.
// En este caso, todos los elementos se cambian por 0.
// Ejemplo:
let elementos = [1, 2, 3];
elementos.fill(0);
console.log(elementos); // [0, 0, 0]


// 8. filter()
// Selecciona solamente los elementos que cumplen una condición.
// Es como hacer un filtro en una lista.
// Ejemplo:
let numerosPares = [1, 2, 3, 4];
console.log(numerosPares.filter(numero => numero % 2 === 0));  // [2, 4]


// 9. find()
// Busca y devuelve el primer elemento que cumple una condición.
// Si no encuentra ninguno, devuelve undefined.
// Ejemplo:
let cantidades = [5, 12, 8];
console.log(cantidades.find(numero => numero > 10)); // 12


// 10. findIndex()
// Busca la posición del primer elemento que cumple una condición.
// Si no encuentra ninguno, devuelve -1.
// Ejemplo:
let notas = [2, 4, 5];
console.log(notas.findIndex(nota => nota === 5)); // 2


// 11. findLast()
// Busca desde el final del array y devuelve
// el último elemento que cumple una condición.
// Ejemplo:
let numeros2 = [4, 7, 10, 13];
console.log(numeros2.findLast(numero => numero > 5)); // 13


// 12. findLastIndex()
// Busca desde el final y devuelve la posición
// del último elemento que cumple una condición.
// Ejemplo:
let numeros3 = [4, 7, 10, 13];
console.log(numeros3.findLastIndex(numero => numero > 5)); // 3


// 13. flat()
// Sirve para sacar los arrays que están dentro de otros arrays.
// Convierte una lista con sublistas en una lista más sencilla.
// Ejemplo:
let matriz = [1, [2, 3]];
console.log(matriz.flat()); // [1, 2, 3]


// 14. flatMap()
// Primero cambia cada elemento y después une
// los resultados en un solo array.
// Ejemplo:
let frases = ["Hola mundo"];
console.log(frases.flatMap(frase => frase.split(" ")));  // ["Hola", "mundo"]


// 15. forEach()
// Repite una acción una vez por cada elemento del array.
// En este ejemplo, muestra cada nombre en la consola.
// Ejemplo:
let nombres = ["Ana", "Luis"];
nombres.forEach(nombre => console.log(nombre));


// 16. includes()
// Comprueba si un valor existe dentro del array.
// Devuelve true si lo encuentra y false si no lo encuentra.
// Ejemplo:
let animales = ["perro", "gato"];
console.log(animales.includes("gato")); // true


// 17. indexOf()
// Busca un elemento y devuelve la posición
// donde aparece por primera vez.
// Si no existe, devuelve -1.
// Ejemplo:
let letras = ["a", "b", "a"];
console.log(letras.indexOf("a")); // 0


// 18. join()
// Une todos los elementos del array para formar un texto.
// Permite elegir qué símbolo se coloca entre ellos.
// Ejemplo:
let dias = ["lunes", "martes", "miércoles"];
console.log(dias.join(" - "));   // lunes - martes - miércoles


// 19. keys()
// Muestra las posiciones o números de índice del array.
// Ejemplo:
let lista = ["A", "B", "C"];
console.log([...lista.keys()]); // [0, 1, 2]


// 20. lastIndexOf()
// Busca un elemento comenzando desde el final
// y devuelve la posición de su última aparición.
// Ejemplo:
let valores2 = [1, 2, 1, 3];
console.log(valores2.lastIndexOf(1)); // 2


// 21. map()
// Crea una nueva lista cambiando cada elemento.
// En este ejemplo, multiplica todos los números por 2.
// Ejemplo:
let numeros4 = [1, 2, 3];
console.log(numeros4.map(numero => numero * 2)); // [2, 4, 6]


// 22. pop()
// Elimina el último elemento del array.
// También devuelve el elemento que eliminó.
// Ejemplo:
let frutas2 = ["manzana", "pera"];
console.log(frutas2.pop()); // pera
console.log(frutas2); // ["manzana"]


// 23. push()
// Agrega uno o más elementos al final del array.
// Ejemplo:
let frutas3 = ["manzana"];
frutas3.push("pera");
console.log(frutas3); // ["manzana", "pera"]


// 24. reduce()
// Junta todos los elementos para obtener un solo resultado.
// Se usa mucho para sumar valores.
// Ejemplo:
let numeros5 = [1, 2, 3];
console.log(
  numeros5.reduce((total, numero) => total + numero, 0));  // 6


// 25. reduceRight()
// Funciona parecido a reduce(), pero comienza
// a trabajar desde el último elemento hacia el primero.
// Ejemplo:
let palabras = ["Hola", "mundo"];
console.log(
  palabras.reduceRight((resultado, palabra) => resultado + " " + palabra));  // mundo Hola


// 26. reverse()
// Cambia el orden de los elementos.
// El primero pasa a ser el último y viceversa.
// Ejemplo:
let numeros6 = [1, 2, 3];
numeros6.reverse();
console.log(numeros6); // [3, 2, 1]


// 27. shift()
// Elimina el primer elemento del array.
// También devuelve el elemento eliminado.
// Ejemplo:
let ciudades = ["Bogotá", "Cali"];
console.log(ciudades.shift()); // Bogotá
console.log(ciudades); // ["Cali"]


// 28. slice()
// Copia una parte del array y crea un nuevo array.
// No cambia el array original.
// Ejemplo:
let numeros7 = [1, 2, 3, 4];
console.log(numeros7.slice(1, 3)); // [2, 3]


// 29. some()
// Comprueba si por lo menos un elemento cumple
// una condición.
// Devuelve true si encuentra uno.
// Ejemplo:
let numeros8 = [1, 3, 5, 8];
console.log(numeros8.some(numero => numero % 2 === 0));  // true


// 30. sort()
// Ordena los elementos del array.
// Para ordenar números se utiliza (a, b) => a - b.
// Ejemplo:
let numeros9 = [10, 2, 5];
numeros9.sort((a, b) => a - b);
console.log(numeros9); // [2, 5, 10]


// 31. splice()
// Permite eliminar, agregar o reemplazar elementos.
// En este ejemplo, elimina un elemento desde la posición 1.
// Ejemplo:
let frutas4 = ["manzana", "pera", "uva"];
frutas4.splice(1, 1);
console.log(frutas4); // ["manzana", "uva"]


// 32. toLocaleString()
// Convierte los elementos en texto usando un formato
// propio del idioma o país indicado.
// En Colombia, 1000 se muestra como 1.000.
// Ejemplo:
let precios = [1000, 2000];
console.log(precios.toLocaleString("es-CO"));  // 1.000,2.000


// 33. toString()
// Convierte el array en un texto.
// Los elementos quedan separados por comas.
// Ejemplo:
let colores2 = ["rojo", "azul"];
console.log(colores2.toString()); // rojo,azul


// 34. unshift()
// Agrega uno o más elementos al inicio del array.
// Ejemplo:
let numeros10 = [2, 3];
numeros10.unshift(1);
console.log(numeros10); // [1, 2, 3]


// 35. values()
// Muestra solamente los valores guardados en el array,
// sin mostrar sus posiciones.
// Ejemplo:
let nombres2 = ["Ana", "Luis"];
console.log([...nombres2.values()]);  // ["Ana", "Luis"]