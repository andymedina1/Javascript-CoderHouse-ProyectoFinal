// Funciones útiles

function validarString(string) {
  if (typeof string === 'string' && string !== '') {
    return string
  } else {
    return 'Debe ingresar un texto válido.'
  }
}

function validarStringNoNumber(string) {
  if (!isNaN(string) || validarString(string) === 'Debe ingresar un texto válido.') {
    alert('Debe ingresar un texto válido.')
  } else {
    return string
  }
}


//Información
const baseDeDatos = [
  { id: 1, nombre: "Televisión", precio: 8463, stock: 17 },
  { id: 2, nombre: "Monitor", precio: 7338, stock: 27 },
  { id: 3, nombre: "Notebook", precio: 4390, stock: 23 },
  { id: 4, nombre: "Licuadora", precio: 3869, stock: 16 },
  { id: 5, nombre: "Heladera", precio: 4391, stock: 4 },
  { id: 6, nombre: "Batidora", precio: 6924, stock: 16 },
  { id: 7, nombre: "Teclado", precio: 7640, stock: 14 },
  { id: 8, nombre: "Lavarropas", precio: 7429, stock: 9 },
  { id: 9, nombre: "Mouse", precio: 1976, stock: 27 },
  { id: 10, nombre: "Auriculares", precio: 337, stock: 20 },
  { id: 11, nombre: "Procesador", precio: 2643, stock: 3 },
  { id: 12, nombre: "MousePad", precio: 6743, stock: 28 },
  { id: 13, nombre: "Placa Gráfica", precio: 4812, stock: 4 },
  { id: 14, nombre: "Numático", precio: 7112, stock: 14 },
  { id: 15, nombre: "Heladera Inteligente", precio: 9376, stock: 4 },
  { id: 16, nombre: "Podadora", precio: 5748, stock: 12 },
  { id: 17, nombre: "Zapatillas", precio: 1381, stock: 17 },
  { id: 18, nombre: "Pantalones", precio: 3531, stock: 11 },
  { id: 19, nombre: "Remera", precio: 1092, stock: 3 },
  { id: 20, nombre: "Silla", precio: 6615, stock: 16 },
  { id: 21, nombre: "Mesa", precio: 9401, stock: 27 },
  { id: 22, nombre: "Platos", precio: 7820, stock: 22 },
  { id: 23, nombre: "Vasos", precio: 5997, stock: 14 },
  { id: 24, nombre: "Tazas", precio: 292, stock: 16 },
  { id: 25, nombre: "Consola", precio: 8831, stock: 24 },
  { id: 26, nombre: "Joystick", precio: 459, stock: 21 },
  { id: 27, nombre: "Guitarra", precio: 270, stock: 29 },
  { id: 28, nombre: "Batería", precio: 5704, stock: 27 },
  { id: 29, nombre: "Piano", precio: 8532, stock: 23 },
  { id: 30, nombre: "Cortinas", precio: 3763, stock: 8 },
  { id: 31, nombre: "Cargador", precio: 1837, stock: 14 },
  { id: 32, nombre: "Celular", precio: 2714, stock: 7 },
  { id: 33, nombre: "Amplificador", precio: 907, stock: 20 },
  { id: 34, nombre: "Router", precio: 1450, stock: 29 },
  { id: 35, nombre: "Parlantes", precio: 7700, stock: 6 },
  { id: 36, nombre: "Disco sólido", precio: 2318, stock: 7 },
  { id: 37, nombre: "Memoria RAM", precio: 1641, stock: 29 },
  { id: 38, nombre: "Sillón", precio: 8659, stock: 4 },
  { id: 39, nombre: "Plancha", precio: 6444, stock: 18 },
  { id: 40, nombre: "Tostador", precio: 2396, stock: 19 },
  { id: 41, nombre: "Exprimidor", precio: 5797, stock: 11 },
  { id: 42, nombre: "Espejo", precio: 1462, stock: 25 },
  { id: 43, nombre: "Cama", precio: 9036, stock: 4 },
  { id: 44, nombre: "PenDrive", precio: 386, stock: 10 },
  { id: 45, nombre: "Aire acondicionado", precio: 9265, stock: 17 },
  { id: 46, nombre: "Lavavajillas", precio: 7948, stock: 14 },
  { id: 47, nombre: "Escritorio", precio: 2622, stock: 25 },
  { id: 48, nombre: "Gabinete", precio: 4069, stock: 9 },
  { id: 49, nombre: "Freezer", precio: 4582, stock: 17 },
  { id: 50, nombre: "Horno", precio: 2270, stock: 30 }
]



//Código

class Carrito {
  constructor() {
    this.esteCarrito = []
  }

  addElementToCart() {
    /**formatear la entrada
     * ver si el proucto existe
     * después ver si hay en stock
     * después lo añado
     */

    // Recibir y formatear la entrada
    do {
      this.productoTemporal = validarStringNoNumber(prompt("Ingrese un elemento para añadir al carrito:"))
    } while (this.productoTemporal === undefined)


    //Ver si el producto existe
    console.clear()
    console.log(baseDeDatos.filter(elem => elem.nombre === this.productoTemporal))

    //Añadir producto al carrito
    this.esteCarrito.push(this.productoTemporal)
  }

  seachElementsInStore() {

  }

  deleteElementFromCart() {
  }

  showElementsInCart() {
  }

  getElementById() {
  }

  getElementByName() {
  }



}






let carrito1 = new Carrito();






