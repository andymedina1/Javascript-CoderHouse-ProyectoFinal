
/*    Elementos del DOM   */

const container = document.querySelector('#middleContainer')
const botonAbrirCarrito = document.querySelector('#botonCarrito')
const modal = new bootstrap.Modal(document.querySelector('#miModal'))
const modalCompra = new bootstrap.Modal(document.querySelector('#modalCompra'))
const modalError = new bootstrap.Modal(document.querySelector('#modalError'))
const buscador = document.querySelector('#buscador')
const filtro = document.querySelector('#filtro')
const modalProductos = document.querySelector('#modalProductos')
const modalTotal = document.querySelector('#modalTotal')
const numeroCarrito = document.querySelector('#numeroCarrito')
const botonVaciarCarrito = document.querySelector('#vaciarCarrito')
const botonComprarCarrito = document.querySelector('#comprarCarrito')

/*    Productos desde JSON   */

let baseDeDatos
async function fetchDataRender() {
  const response = await fetch("./productos.json")
  baseDeDatos = await response.json()
  renderProducts(baseDeDatos)
}

/*    Funciones   */

// Función para mostrar los productos en pantalla
function renderProducts(data) {
  container.innerHTML = ''
  data.forEach(producto => {
    container.innerHTML += /* html */
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
  setButtons()
}

// Función para configurar botones de Agregar al carrito cada vez que renderizo
function setButtons() {
  // obtengo los botones
  const botonesAgregar = document.querySelectorAll('.agregarCarrito')

  // Le agrego la función a cada uno
  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', (btn) => {
      agregarProducto(btn)
    })
  })

}

// Función para agregar los productos al carrito y guardar en LocalStorage
function agregarProducto(btn) {
  const botonId = btn.target.id
  const index = baseDeDatos.findIndex(producto => producto.id == botonId)
  const productoSeleccionado = baseDeDatos[index]

  // Verifico si el producto está en el carrito
  if (esteCarrito.some(prod => prod.id == productoSeleccionado.id)) {
    // Si el producto ya está en el carrito, solo aumento la cantidad
    const indexCarrito = esteCarrito.findIndex(prod => prod.id == productoSeleccionado.id)
    esteCarrito[indexCarrito].cantidad += 1
  } else {
    // Si el producto NO está en el carrito, añado el nuevo producto
    esteCarrito.push({ ...baseDeDatos[index] })
  }

  // Guardo el carrito
  localStorage.setItem('carrito', JSON.stringify(esteCarrito))

  // Actualizo el badge
  cartNumber()
}

// Función para cargar los productos en el carrito
function fillCart() {
  modalProductos.innerHTML = ''
  let totalFinal = 0
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
  })
  modalTotal.innerHTML = ''
  modalTotal.innerHTML += `Total: $${totalFinal}`
}

// Función para cambiar número del carrito
function cartNumber() {
  let count = 0
  const carrito = JSON.parse(localStorage.getItem('carrito'))
  carrito.forEach(producto => {
    count += producto.cantidad
  })
  numeroCarrito.innerHTML = count
}

// Función para vaciar el carrito
function vaciarCarrito() {
  esteCarrito = []
  localStorage.setItem('carrito', JSON.stringify([]))
  numeroCarrito.innerHTML = 0
  modal.hide()
}

// Función para comprar el carrito
function comprarCarrito() {
  modal.hide()

  // Verifico que el carrito no esté vacío
  if (esteCarrito.length == 0) {
    return modalError.show()
  }

  modalCompra.show()
  vaciarCarrito()
}



/*    Eventos   */

// Input del buscador
buscador.addEventListener('input', (e) => {
  const busqueda = e.target.value.toLowerCase()
  const resultado = baseDeDatos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda)
  )
  renderProducts(resultado)
})

// Input para filtrar
filtro.addEventListener('input', (e) => {
  const seleccion = e.target.value
  const resultado = baseDeDatos.filter(producto =>
    producto.categoria.includes(seleccion)
  )
  renderProducts(resultado)
})

// Botón para mostrar el Carrito
botonAbrirCarrito.addEventListener('click', () => {
  fillCart()

  // Si el carrito está vacío, deshabilito el botón para vaciar
  if (esteCarrito.length == 0) {
    botonVaciarCarrito.setAttribute("disabled", "")
  } else {
    botonVaciarCarrito.removeAttribute("disabled")
  }

  modal.show()
})

// Botón para vaciar el carrito
botonVaciarCarrito.addEventListener('click', vaciarCarrito)

// Botón para comprar el carrito
botonComprarCarrito.addEventListener('click', comprarCarrito)



/*    Inicialización   */

// Obtengo los productos desde el JSON y los renderizo
fetchDataRender()

// Obtengo el carrito anterior o inicializo uno vacío
let esteCarrito = JSON.parse(localStorage.getItem('carrito')) || []

// Actualizo el número del carrito
cartNumber()
