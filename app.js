/* Tareas pendientes:

# poder realizar operaciones a través del teclado también
# que no se pueda poner un signo de multiplicación/división detrás de un + o un -
# que no se pueda poner un + o un - después de dos símbolos de sumar y/o restar

*/

const datos = document.getElementById('datos');
let currentValue = null;
let lastValue = null;
//let aCalcular = [];
//let sumasRestas = [];

function clickHandler (event) {
  currentValue = event.target.value;

  if (lastValue === '/' && currentValue == 0) {
    alert('¡No se puede dividir entre cero!');
  } else {
    datos.innerText += currentValue;
  }

  /*switch (currentValue) {
    case '+': if (lastValue && !isNaN(lastValue)) { sumasRestas.push(currentValue) }; break;
    case '-': if (lastValue && !isNaN(lastValue)) { sumasRestas.push(currentValue) }; break;
  }*/

  lastValue = currentValue;
}

function reiniciar () {
  datos.innerText = '';
}

function calcular () {
  const input = datos.innerText;
                                              // n: negativo
  let valores = input.replace(/\+\+/g,'+')    // ++ => +
                     .replace(/\-\-/g,'-n')   // -- => -n
                     .replace(/\+\-/g,'+n')   // +- => +n
                     .replace(/\-\+/g,'-')    // -+ => -
                     .replace(/\/\+/g,'/')    // /+ => /
                     .replace(/x\+/g,'x')     // x+ => x
                     .replace(/\/-/g,'\/n')   // /- => /n
                     .replace(/x-/g,'xn');    // x- => xn
  // nos quedamos por un lado las sumas y las restas
  let sumasRestas = valores.replace(/[\d|x|n|\/]/g,'').split('');
  // y por otro con las divisiones y las multiplicaciones
  // que calcularemos lo primero
  let filtro = valores.replace(/[\+|\-]/g,',').split(',');
  console.log(sumasRestas,filtro);
  let numeros = []; // y vamos a añadir los números resultantes en un array

  filtro.forEach( elemento => {
    if (elemento.includes('x') || elemento.includes('/')) {
      // separamos de nuevo las cifras de los operadores
      let operaciones = elemento.replace(/n/g,'-').split(/[x|\/]/g);
      console.log(operaciones);
      let multiDivisiones = elemento.replace(/[\d|n]/g,'').split('');
      let operacion = 0;

      // y calculamos !!
      let resultado = operaciones.reduce( (total,num) => {
        if (multiDivisiones[operacion] === 'x') {
          operacion += 1;
          return total * num;
        } else {
          operacion += 1;
          return total / num;
        }
      });

      // añadimos los resultados al array
      // para poder seguir calculando las sumas y las restas
      numeros.push(resultado);

    } else {
      numeros.push(elemento.replace('n','-'));
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

  datos.innerText = resultadoTotal;
}

/*

      __    ___     __
||   /  \  /   )   /  \  ||\   ||
||  ||  ||||  __  ||  || || \  ||
||  ||  ||||   || ||==|| ||  \ ||
||__ \__/  \___/  ||  || ||   \||
https://github.com/drowvoloper

*/
