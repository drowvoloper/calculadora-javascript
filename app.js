/* Tareas pendientes:

# números negativos
# que después de un / no se pueda poner un 0
# que se muestre el resultado
# poder realizar operaciones a través del teclado también

*/

const datos = document.getElementById('datos');

function clickHandler (event) {
  datos.innerText += event.target.value;
}

function reiniciar () {
  datos.innerText = '';
}

function calcular () {
  const input = datos.innerText;
  // nos quedamos por un lado las sumas y las restas
  let sumasRestas = input.replace(/[\d|x|/]/g,'').split('');
  // y por otro con las divisiones y las multiplicaciones
  // que calcularemos lo primero
  let filtro = input.split(/[-|+]/g);
  let numeros = []; // y vamos a añadir los números resultantes en un array

  filtro.forEach( elemento => {
    if (elemento.includes('x') || elemento.includes('/')) {
      // separamos de nuevo las cifras de los operadores
      let operaciones = elemento.split(/[x|\/]/g);
      let multiDivisiones = elemento.replace(/\d/g,'').split('');
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
      numeros.push(parseInt(elemento));
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
