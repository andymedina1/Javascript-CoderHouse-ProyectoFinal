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
  { nombre: "Tv", precio: 8463, stock: 5 },
  { nombre: "Monitor", precio: 7338, stock: 27 },
  { nombre: "Notebook", precio: 4390, stock: 23 },
  { nombre: "Licuadora", precio: 3869, stock: 16 },
  { nombre: "Heladera", precio: 4391, stock: 0 },
  { nombre: "Batidora", precio: 6924, stock: 0 },
  { nombre: "Teclado", precio: 7640, stock: 0 },
  { nombre: "Lavarropas", precio: 7429, stock: 9 },
  { nombre: "Mouse", precio: 1976, stock: 0 },
  { nombre: "Auriculares", precio: 337, stock: 20 },
  { nombre: "Procesador", precio: 2643, stock: 3 },
  { nombre: "MousePad", precio: 6743, stock: 28 },
  { nombre: "Amplificador", precio: 4812, stock: 4 },
  { nombre: "Llantas", precio: 7112, stock: 0 },
  { nombre: "Freezer", precio: 9376, stock: 4 },
  { nombre: "Podadora", precio: 5748, stock: 0 },
  { nombre: "Zapatillas", precio: 1381, stock: 17 },
  { nombre: "Pantalones", precio: 3531, stock: 11 },
  { nombre: "Remera", precio: 1092, stock: 3 },
  { nombre: "Silla", precio: 6615, stock: 0 }
]


//Bienvenida
console.log('Bienvenido a nuestra tienda!')
console.group('Tenemos a la venta los siguientes productos:')
console.table(baseDeDatos)
console.groupEnd()


//Código

class Carrito {
  constructor() {
    this.productos = []
  }

  agregarProducto() {
    // Recibir y formatear la entrada
    do {
      this.productoTemporal = validarStringNoNumber(prompt("Ingrese un producto para añadir al carrito:"))
    } while (this.productoTemporal === undefined)

    this.productoTemporal = String(this.productoTemporal).toLowerCase()


    //Verificar si el producto existe
    let existe = baseDeDatos.some(elem => elem.nombre.toLowerCase() === this.productoTemporal)

    if (!existe) {
      console.log(`No contamos con ese producto, elija otro`)
      alert(`No contamos con ese producto, elija otro`)
      return
    }

    //Verificar el stock del producto
    let stock = baseDeDatos.some(elem => (elem.nombre.toLowerCase() === this.productoTemporal && elem.stock > 0))

    if (!stock) {
      console.log('El producto seleccionado está fuera de stock, elija otro por favor')
      alert('El producto seleccionado está fuera de stock, elija otro por favor')
    }

    //Después de cumplir las dos condiciones, añado el producto al carrito
    if (existe && stock) {
      let productoCase = String(this.productoTemporal)
      productoCase = productoCase.charAt(0).toUpperCase() + productoCase.slice(1);
      let indexProducto = baseDeDatos.findIndex(elem => elem.nombre === productoCase)
      let productoFinal = { ...baseDeDatos[indexProducto] }
      delete productoFinal.stock
      this.productos.push(productoFinal)
      alert(`Producto añadido al carrito!`)
      return `${productoCase} añadido al carrito!`
    }

  }

  verProductos() {

    if (this.productos.length === 0) {
      return 'Tu carrito está vacío!'
    }

    console.group(`Estos son los productos que están actualmente en tu carrito:`)
    console.table(this.productos)
    console.groupEnd()
  }

  eliminarProducto() {
  }

  calcularTotal() {
    let suma = 0;
    this.productos.forEach(product => suma += product.precio)
    this.verProductos()
    console.log(`El total de tu carrito es: $${suma}`)
  }

  verListado() {
    console.log('Estos son todos nuestros productos:')
    console.table(baseDeDatos)
    return 'Estos son todos nuestros productos:';
  }

  buscarProductos(producto) {
    const entrada = producto.toLowerCase()
    const answer = baseDeDatos.filter(elemento => elemento.nombre.toLowerCase().includes(entrada))
    console.group('Este es el resultado de la búsqueda:')
    console.table(answer)
    console.groupEnd()
  }



}


let carrito = new Carrito();






