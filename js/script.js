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
  { id: 0, nombre: 'Tv', precio: 8463, categoria: 'pantallas', cantidad: 1, img: 'img/tv.jpg' },
  { id: 1, nombre: 'Monitor', precio: 3387, categoria: 'pantallas', cantidad: 1, img: 'img/monitor.jpg' },
  { id: 2, nombre: 'Notebook', precio: 4390, categoria: 'equipos', cantidad: 1, img: 'img/notebook.jpg' },
  { id: 3, nombre: 'Licuadora', precio: 3869, categoria: 'hogar', cantidad: 1, img: 'img/licuadora.jpg' },
  { id: 4, nombre: 'Heladera', precio: 4391, categoria: 'hogar', cantidad: 1, img: 'img/heladera.jpg' },
  { id: 5, nombre: 'Teclado', precio: 6400, categoria: 'perifericos', cantidad: 1, img: 'img/teclado.jpg' },
  { id: 6, nombre: 'Mouse', precio: 976, categoria: 'perifericos', cantidad: 1, img: 'img/mouse.jpg' },
  { id: 7, nombre: 'Auriculares', precio: 337, categoria: 'perifericos', cantidad: 1, img: 'img/auriculares.jpg' },
  { id: 8, nombre: 'Procesador', precio: 2643, categoria: 'complementos', cantidad: 1, img: 'img/procesador.jpg' },
  { id: 9, nombre: 'Memoria', precio: 6743, categoria: 'complementos', cantidad: 1, img: 'img/memoria.jpg' },
]

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




// Elementos del DOM

const container = document.querySelector('#middleContainer')
const botonAbrirCarrito = document.querySelector('#botonCarrito')
const modal = new bootstrap.Modal(document.querySelector('#miModal'))
const modalCompra = new bootstrap.Modal(document.querySelector('#modalCompra'))
const buscador = document.querySelector('#buscador')
const filtro = document.querySelector('#filtro')
const modalProductos = document.querySelector('#modalProductos')
const modalTotal = document.querySelector('#modalTotal')
const numeroCarrito = document.querySelector('#numeroCarrito')
const botonVaciarCarrito = document.querySelector('#vaciarCarrito')
const botonComprarCarrito = document.querySelector('#comprarCarrito')



// Botón del Carrito
botonAbrirCarrito.addEventListener('click', () => {
  fillCart()
  modal.show()
})


//Función para mostrar los productos en pantalla
function renderProducts(data) {
  container.innerHTML = ''
  data.forEach(producto => {
    container.innerHTML += /*html*/
      `<div class="tarjeta">
      <div class="tarjeta-producto">
        <h4>${producto.nombre}</h4>
        <img src="${producto.img}" alt="Imágen de ${producto.nombre}">
        <h4 class="tarjeta-precio">$${producto.precio}</h4>
      </div>
      <div class="tarjeta-boton">
        <button type="button" class="btn btn-primary agregarCarrito" id="${producto.id}">
        <span>Agregar al carrito</span>
        <span><i class="bi bi-cart4"></i></span>
        </button>
      </div>
      `
  })
  agregarMaestro()
}



//Función del buscador
buscador.addEventListener('input', (e) => {
  const busqueda = e.target.value.toLowerCase()
  const resultado = baseDeDatos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda)
  )
  renderProducts(resultado)
})


//Función para filtrar
filtro.addEventListener('input', (e) => {
  const input = e.target.value
  const resultado = baseDeDatos.filter(producto =>
    producto.categoria.includes(input)
  )
  renderProducts(resultado)
})


//Función para Agregar al carrito desde botón de tarjeta
function agregarMaestro() {

  // obtengo los botones 
  const botonesAgregar = document.querySelectorAll('.agregarCarrito')

  // Le agrego la función a cada uno
  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', (btn) => {
      agregar(btn)
    })
  });


  //Función para agregar los productos al carrito y guardar en LocalStorage
  function agregar(btn) {
    const id = btn.target.id
    const index = baseDeDatos.findIndex(producto => producto.id == id)
    const producto = baseDeDatos[index]

    //Verifico si el producto está en el carrito
    if (esteCarrito.some(prod => prod.id == producto.id)) {
      //Si el producto ya está en el carrito, solo aumento la cantidad
      const dice = esteCarrito.findIndex(prod => prod.id == producto.id)
      esteCarrito[dice].cantidad += 1;
    } else {
      //Si el producto NO está en el carrito, añado el nuevo producto
      esteCarrito.push({ ...baseDeDatos[index] })
    }

    localStorage.setItem('carrito', JSON.stringify(esteCarrito));

    cartNumber()
  }

}


//Función para cargar los productos en el carrito
function fillCart() {
  modalProductos.innerHTML = ''
  let totalFinal = 0;
  const productosCarrito = JSON.parse(localStorage.getItem('carrito'))
  productosCarrito.forEach(producto => {
    modalProductos.innerHTML += /* html */
      `<tr>
      <td> ${producto.nombre} </td>
      <td> ${producto.cantidad}</td>
      <td>$${producto.precio}</td>
      <td>$${producto.cantidad * producto.precio}</td>
    </tr>
    `
    totalFinal += (producto.cantidad * producto.precio)
  });
  modalTotal.innerHTML = ''
  modalTotal.innerHTML += `Total: $${totalFinal}`
}



//Cambiar número del carrito
function cartNumber() {
  let count = 0;
  const carrito = JSON.parse(localStorage.getItem('carrito'))
  carrito.forEach(producto => {
    count += producto.cantidad
  });
  numeroCarrito.innerHTML = count
}

//Función para vaciar el carrito
function vaciarCarrito() {
  esteCarrito = []
  localStorage.setItem('carrito', JSON.stringify([]));
  numeroCarrito.innerHTML = 0
  modal.hide()
}

//Botón para vaciar el carrito
botonVaciarCarrito.addEventListener('click', vaciarCarrito)



//Función para comprar el carrito
function comprarCarrito() {
  modal.hide()
  modalCompra.show()
  vaciarCarrito()
}

//Botón para comprar el carrito
botonComprarCarrito.addEventListener('click', comprarCarrito)


//Primero muestro todos los productos
renderProducts(baseDeDatos)

//Obtengo el carrito anterior o inicializo uno vacío
let esteCarrito = JSON.parse(localStorage.getItem('carrito')) || []

// Actualizo el número del carrito
cartNumber()