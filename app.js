/* Tareas pendientes:

// no poner dos puntos antes de un operador

*/

const datos = document.getElementById('datos');
let valorActual = null;
let ultimoValor = null;
let penultimoValor = null;
let todosValores = '';
const operadores = [['+','-'],['/','x']]

function clickHandler (event) {
  valorActual = event.target.value;

  if (ultimoValor === '/' && valorActual == 0) {
    return alert('¡No se puede dividir entre cero!');
  } else if (operadores[0].includes(ultimoValor) && operadores[1].includes(valorActual)) {
    return alert('Esa operación no es válida');
  } else if (operadores[1].includes(ultimoValor) && operadores[1].includes(valorActual)) {
    return alert('Esa operación no es válida');
  } else if (operadores[0].includes(penultimoValor) && operadores[0].includes(ultimoValor) && operadores[0].includes(valorActual)) {
    return alert('Esa operación no es válida');
  } else if (ultimoValor === '.' && valorActual === '.') {
    return alert('Esa operación no es válida');
  }

  todosValores += valorActual;
  datos.innerText = todosValores.slice(-21);

  penultimoValor = ultimoValor;
  ultimoValor = valorActual;
}

function reiniciar () {
  datos.innerText = '';
}

function calcular () {
  let input = datos.innerText;

  // comprobamos si hay operadores de multiplicación/división al principio
  // y si es así, los quitamos
  if (input.charAt(0) === 'x' || input.charAt(0) === '/') {
    input = input.substr(1);
  }

  // comprobamos si hay operadores al final del todo y los quitamos
  // y si es así, los quitamos
  while (isNaN(input.charAt(input.length-1))) {
    input = input.substr(0,input.length-1);
  }

  // preparamos los operadores para poder trabajar con ellos (n: negativo)
  let valores = input.replace(/\+\+/g,'+')    // ++ => +
                     .replace(/\-\-/g,'-n')   // -- => -n
                     .replace(/\+\-/g,'+n')   // +- => +n
                     .replace(/\-\+/g,'-')    // -+ => -
                     .replace(/\/\+/g,'/')    // /+ => /
                     .replace(/x\+/g,'x')     // x+ => x
                     .replace(/\/-/g,'\/n')   // /- => /n
                     .replace(/x-/g,'xn');    // x- => xn

  // nos quedamos por un lado las sumas y las restas
  let sumasRestas = valores.replace(/[\d|x|n|\/|\.]/g,'').split('');
  // y por otro con las divisiones y las multiplicaciones
  // que calcularemos lo primero
  let filtro = valores.replace(/[\+|\-]/g,',').split(',');
  console.log(filtro);
  let numeros = []; // y vamos a añadir los números resultantes en un array

  filtro.forEach( elemento => {
    if (elemento.includes('x') || elemento.includes('/')) {
      // separamos de nuevo las cifras de los operadores
      let operaciones = elemento.replace(/n/g,'-').split(/[x|\/]/g);

      let multiDivisiones = elemento.replace(/[\d|n|\.]/g,'').split('');
      let operacion = 0;
console.log(multiDivisiones);
      // y calculamos !!
      let resultado = operaciones.reduce( (total,num) => {
        if (multiDivisiones[operacion] === 'x') {
          operacion += 1;
          return total * parseFloat(num);
        } else {
          operacion += 1;
          return total / parseFloat(num);
        }
      });

      // añadimos los resultados al array
      // para poder seguir calculando las sumas y las restas
      numeros.push(resultado);

    } else {
      numeros.push(parseFloat(elemento.replace('n','-')));
    }
  });

  let operacion = 0;

  let resultadoTotal = numeros.reduce( (total,num) => {
    if (sumasRestas[operacion] === '+') {
      operacion += 1;
      return total + num;
    } else {
      operacion += 1;
      return total - num;
    }
  });

  datos.innerText = resultadoTotal.substr(0,21);
}

/*

      __    ___     __
||   /  \  /   )   /  \  ||\   ||
||  ||  ||||  __  ||  || || \  ||
||  ||  ||||   || ||==|| ||  \ ||
||__ \__/  \___/  ||  || ||   \||
https://github.com/drowvoloper

*/
