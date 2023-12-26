//Funciones
function stringToNumber (string) {
  if (isNaN(parseFloat(string))) {
    return 'Debe ingresar un número.'
  } else {
    return parseFloat(string)
  }
}

function validarNumber (number) {
  if (isNaN(parseFloat(number))) {
    alert('Debe ingresar un número.')
  } else if (parseFloat(number) < 0) {
    alert('Debe ingresar un número válido.')
  } else {
    return parseFloat(number)
  }
}

function validarString (string) {
  if (typeof string === 'string' && string !== '') {
    return string
  } else {
    return 'Debe ingresar un texto válido.'
  }
}

function validarStringNoNumber (string) {
  if (validarString(string) === 'Debe ingresar un texto válido.') {
    alert('Debe ingresar un texto válido.')
  } else if (!isNaN(string)) {
    alert('Debe ingresar un texto válido.')
  } else {
    return string
  }
}

function validarCuotas (number) {
  switch (number) {
    case 3:
    case 6:
    case 12:
    case 18:
      return number
    default:
      alert('Solo puede elegir 3, 6, 12 o 18 cuotas')
      break
  }
}

function obtenerCuotas () {
  const cuotas = stringToNumber(prompt('Seleccione la cantidad de cuotas:\n(3, 6, 12 o 18)'))
  if (typeof cuotas === 'string') {
    alert('Debe ingresar un número entre:\n3, 6, 12 o 18.')
  } else {
    return validarCuotas(cuotas)
  }
}

function calcularInt (precio, cuotas) {
  // Intereses tomados del plan Ahora12
  let resultado
  switch (cuotas) {
    case 3:
      resultado = (precio * 1.1601) / 3
      break
    case 6:
      resultado = (precio * 1.3372) / 6
      break
    case 12:
      resultado = (precio * 1.7683) / 12
      break
    case 18:
      resultado = (precio * 2.3284) / 18
      break
  }
  return resultado
}

// VARIABLES
let totalProductos

let producto

let valorProducto

let cantidadCuotas

// Bienvenida
alert("Calculadora de Cuotas:\nTomando el costo de un producto, devuelve el valor del costo de las cuotas con el interés correspondiente.")

// Ingresar cantidad de productos
do {
  totalProductos = validarNumber(prompt('A cuántos productos diferentes quiere calcular sus correspondientes cuotas?'))
} while (totalProductos === undefined)

// Loop principal
for (let i = 0; i < totalProductos; i++) {
  // Ingresar el nombre del producto
  if (i === 0) {
    do {
      producto = validarStringNoNumber(prompt('Ingrese el nombre de un producto:'))
    } while (producto === undefined)
  } else {
    do {
      producto = validarStringNoNumber(prompt('Ingrese el nombre del siguiente producto:'))
    } while (producto === undefined)
  }

  // Ingresar el valor del producto
  do {
    valorProducto = validarNumber(prompt('Ingrese el valor de contado de ' + producto + '.'))
  } while (valorProducto === undefined)

  // Seleccionar cantidad de cuotas
  do {
    cantidadCuotas = obtenerCuotas()
  } while (cantidadCuotas === undefined)

  // Realizar cálculo y mostrar resultado
  const resultado = calcularInt(valorProducto, cantidadCuotas).toFixed(2)

  let mensaje

  if (cantidadCuotas === 3) {
    mensaje = producto + ' te queda en ' + cantidadCuotas + ' cuotas de $' + resultado + ' cada una.\nCon un interés del 16,01%'
  } else if (cantidadCuotas === 6) {
    mensaje = producto + ' te queda en ' + cantidadCuotas + ' cuotas de $' + resultado + ' cada una.\nCon un interés del 33,72%'
  } else if (cantidadCuotas === 12) {
    mensaje = producto + ' te queda en ' + cantidadCuotas + ' cuotas de $' + resultado + ' cada una.\nCon un interés del 76,83%'
  } else if (cantidadCuotas === 18) {
    mensaje = producto + ' te queda en ' + cantidadCuotas + ' cuotas de $' + resultado + ' cada una.\nCon un interés del 132,84%'
  }

  console.log(mensaje)
  alert(mensaje)
}
