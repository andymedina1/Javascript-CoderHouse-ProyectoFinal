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

// Información
const baseDeDatos = [
  { nombre: 'Tv', precio: 8463, stock: 5 },
  { nombre: 'Monitor', precio: 7338, stock: 27 },
  { nombre: 'Notebook', precio: 4390, stock: 23 },
  { nombre: 'Licuadora', precio: 3869, stock: 16 },
  { nombre: 'Heladera', precio: 4391, stock: 0 },
  { nombre: 'Batidora', precio: 6924, stock: 0 },
  { nombre: 'Teclado', precio: 7640, stock: 0 },
  { nombre: 'Lavarropas', precio: 7429, stock: 9 },
  { nombre: 'Mouse', precio: 1976, stock: 0 },
  { nombre: 'Auriculares', precio: 337, stock: 20 },
  { nombre: 'Procesador', precio: 2643, stock: 3 },
  { nombre: 'Memoria', precio: 6743, stock: 28 },
  { nombre: 'Amplificador', precio: 4812, stock: 4 },
  { nombre: 'Llantas', precio: 7112, stock: 0 },
  { nombre: 'Freezer', precio: 9376, stock: 4 },
  { nombre: 'Podadora', precio: 5748, stock: 0 },
  { nombre: 'Zapatillas', precio: 1381, stock: 17 },
  { nombre: 'Pantalones', precio: 3531, stock: 11 },
  { nombre: 'Remera', precio: 1092, stock: 3 },
  { nombre: 'Silla', precio: 6615, stock: 0 }
]

// Bienvenida
console.log('Bienvenido a nuestra tienda!')
console.group('Tenemos a la venta los siguientes productos:')
console.table(baseDeDatos)
console.groupEnd()

// Código

class Carrito {
  constructor() {
    this.productos = []
    this.total = 0
  }

  // Método para añadir productos
  agregarProducto() {
    // Recibir y formatear la entrada
    let producto
    do {
      producto = validarStringNoNumber(prompt('Ingrese un producto para añadir al carrito:'))
    } while (producto === undefined)

    producto = String(producto).toLowerCase()

    // Verificar si el producto existe
    const existeProducto = baseDeDatos.some(elem => elem.nombre.toLowerCase() === producto)

    if (!existeProducto) {
      alert('No contamos con ese producto, elija otro')
      return `No contamos con "${producto}". Elija otro producto por favor.`
    }

    // Verificar el stock del producto
    const stock = baseDeDatos.some(elem => (elem.nombre.toLowerCase() === producto && elem.stock > 0))

    if (!stock) {
      producto = producto.charAt(0).toUpperCase() + producto.slice(1)
      alert('El producto seleccionado está fuera de stock, elija otro por favor')
      return `${producto} está fuera de stock, elija otro producto por favor.`
    }

    // Después de cumplir las dos condiciones, añado el producto al carrito
    let productoCase = String(producto)
    productoCase = productoCase.charAt(0).toUpperCase() + productoCase.slice(1)
    const indexProducto = baseDeDatos.findIndex(elem => elem.nombre === productoCase)
    const productoFinal = { ...baseDeDatos[indexProducto] }
    delete productoFinal.stock
    this.productos.push(productoFinal)
    alert('Producto añadido al carrito!')
    return `${productoCase} añadido al carrito!`
  }

  // Método para ver los productos del carrito
  verProductos() {
    // Verificar que el carrito tenga productos
    if (this.productos.length === 0) {
      alert('Tu carrito está vacío!')
      return 'Tu carrito está vacío!'
    }

    // Mostrar información útil del carrito
    console.group('Estos son los productos que están actualmente en tu carrito:')
    console.table(this.productos)
    console.groupEnd()

    // Revisar singular o plural para la salida
    if (this.productos.length < 2) {
      alert(`Hay ${this.productos.length} producto en tu carrito.`)
      return `Hay ${this.productos.length} producto en tu carrito.`
    } else {
      alert(`Hay ${this.productos.length} productos en tu carrito.`)
      return `Hay ${this.productos.length} productos en tu carrito.`
    }
  }

  // Método para eliminar productos del carrito
  eliminarProducto() {
    // Verificar que el carrito tenga productos
    if (this.productos.length === 0) {
      alert('No puede eliminar productos. Su carrito ya está vacío.')
      return 'No puede eliminar productos. Su carrito ya está vacío.'
    }

    // Recibir el producto a eliminar
    let producto
    do {
      producto = validarStringNoNumber(prompt('Ingrese el nombre del producto que quiera eliminar de su carrito:'))
    } while (producto === undefined)

    producto = String(producto).toLowerCase()

    // Verificar si el producto existe en el carrito
    const existeProducto = this.productos.some(elem => elem.nombre.toLowerCase() === producto)

    if (!existeProducto) {
      alert('Ese producto no se encuentra en su carrito.')
      return `El producto "${producto}" no se encuentra en su carrito.`
    }

    // Después de cumplir la condición, elimino el producto del carrito
    let productoCase = String(producto)
    productoCase = productoCase.charAt(0).toUpperCase() + productoCase.slice(1)
    const indexProducto = this.productos.findIndex(elem => elem.nombre === productoCase)
    this.productos.splice(indexProducto, 1)
    alert('Producto eliminado del carrito!')
    return `${productoCase} eliminado del carrito!`
  }

  // Método para calcular la suma de los precios de los productos del carrito
  calcularTotal() {
    // Verificar que el carrito tenga productos
    if (this.productos.length === 0) {
      alert('Tu carrito está vacío!')
      return 'Tu carrito está vacío!'
    }

    // Suma de los precios
    let suma = 0
    this.productos.forEach(product => suma += product.precio)
    this.verProductos()
    this.total = suma
    alert(`El valor total de tu carrito es: $${suma}`)
    return `El valor total de tu carrito es: $${suma}`
  }

  // Método para volver a mostrar el listado de productos
  verListado() {
    console.group('Estos son todos nuestros productos:')
    console.table(baseDeDatos)
    console.groupEnd()
    console.log('Puedes añadir productos a tu carrito con el comando: %ccarrito.agregarProducto()', 'color: #00ff08')
  }

  // Método para buscar productos dentro del listado
  buscador() {
    // Recibir y formatear la entrada
    let producto
    do {
      producto = validarStringNoNumber(prompt('Ingrese el nombre del producto a buscar:'))
    } while (producto === undefined)
    producto = String(producto).toLowerCase()

    // Realizar la busqueda y mostrar la salida
    const answer = baseDeDatos.filter(elemento => elemento.nombre.toLowerCase().includes(producto))

    // En caso de no encontrar nada, notificar al usuario
    if (!answer.length) {
      alert('La búsqueda no devolvió resultados')
      return `La búsqueda de "${producto}" no devolvió resultados`
    }

    console.group('Este es el resultado de la búsqueda:')
    console.table(answer)
    console.groupEnd()

    // Revisar singular o plural para la salida
    if (answer.length < 2) {
      alert(`La búsqueda devolvió ${answer.length} resultado`)
      return `La búsqueda devolvió ${answer.length} resultado`
    } else {
      alert(`La búsqueda devolvió ${answer.length} resultados`)
      return `La búsqueda devolvió ${answer.length} resultados`
    }
  }
}

const carrito = new Carrito()
