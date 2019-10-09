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
  let sumasRestas = input.split(/[\d|x|\/]/g);
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
      numeros.push(elemento);
    }
  });



  console.log(numeros);
}
