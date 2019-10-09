/* Tareas pendientes:

// accesibilidad

*/

const datos = document.getElementById('datos');
let valorActual = null;
let ultimoValor = null;
let penultimoValor = null;
let todosValores = '';
const operadores = [['+','-'],['/','x']]

function clickHandler (event) {
  valorActual = event.target.value;


  if (ultimoValor === '/'
   && valorActual == 0) {                               // No se puede dividir entre cero
     return;
  } else if (operadores[0].includes(ultimoValor)        // No se puede poner un operador de
          && operadores[1].includes(valorActual)) {     // multiplicación o división después de
    return;                                             // operadores de suma y resta
  } else if (operadores[1].includes(ultimoValor)        // o de otros operadores de multiplicación o división
          && operadores[1].includes(valorActual)) {
    return;
  } else if (operadores[0].includes(penultimoValor)     // No se pueden poner tres operadores
          && operadores[0].includes(ultimoValor)        // de suma y/o resta seguidos
          && operadores[0].includes(valorActual)) {
    return;
  } else if (ultimoValor === '.'                        // Tampoco se pueden poner dos puntos seguidos
          && valorActual === '.') {
    return;
  } else if (ultimoValor === '.'
          && operadores[0].includes(valorActual)) {     // ni delante de operadores
    return;
  } else if (ultimoValor === '.'
          && operadores[1].includes(valorActual)) {
    return;
  } else if (valorActual === '.'
          && operadores[0].includes(ultimoValor)) {     // ni detrás
    return;
  } else if (valorActual === '.'
          && operadores[1].includes(ultimoValor)) {
    return;
  }

  todosValores += valorActual;
  // Mostramos el límite de valores que caben en la calculadora (21)
  datos.innerText = todosValores.slice(-21);

  penultimoValor = ultimoValor;
  ultimoValor = valorActual;
}

function reiniciar () {
  datos.innerText = '';
  todosValores = '';
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

  // y aquí llegan (por fin) las sumas y las restas
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

  // reiniciamos los valores con el total y lo publicamos
  todosValores = resultadoTotal.toString();
  datos.innerText = todosValores.substr(0,21);

}

/*

      __    ___     __
||   /  \  /   )   /  \  ||\   ||
||  ||  ||||  __  ||  || || \  ||
||  ||  ||||   || ||==|| ||  \ ||
||__ \__/  \___/  ||  || ||   \||
https://github.com/drowvoloper

*/
