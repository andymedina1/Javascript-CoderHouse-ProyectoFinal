
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
const carritoProductos = document.querySelector('#carritoProductos')
const carritoTotal = document.querySelector('#carritoTotal')

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
      `
      <div class="producto">
        <img class="producto__img" src="${producto.img}" alt="Imágen de ${producto.nombre}">
        <div class="producto__info">
          <h4 class="producto__titulo">${producto.nombre}</h4>
          <div class="producto__container">
            <h4 class="producto__precio">$${producto.precio}</h4>
            <button type="button" class="producto__boton btn btn-primary agregarCarrito" id="${producto.id}">
              <span><i class="bi bi-cart-plus"></i></span>
            </button>
          </div>
        </div>
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

  // Actualizo el nuevo carrito
  if (carritoVisible()) {
    // si el carro está abierto lo cierro para cargar los datos
    document.getElementById('nuevo-carrito').classList.remove('mostrar')
    setTimeout(() => newFillCart(), 1000) // timeout para esperar animación
  } else {
    // si el carro está cerrado solo cargo los datos
    newFillCart()
  }
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
  document.getElementById('nuevo-carrito').classList.remove('mostrar')
}

// Función para comprar el carrito
function comprarCarrito() {
  document.getElementById('nuevo-carrito').classList.remove('mostrar')

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



// Botón para vaciar el carrito
botonVaciarCarrito.addEventListener('click', vaciarCarrito)

// Botón para comprar el carrito
botonComprarCarrito.addEventListener('click', comprarCarrito)







//    Inicialización   

// Obtengo los productos desde el JSON y los renderizo
fetchDataRender()

// Obtengo el carrito anterior o inicializo uno vacío
let esteCarrito = JSON.parse(localStorage.getItem('carrito')) || []

// Actualizo el número del carrito
cartNumber()




/* función para abrir el viejo Carrito */
/*

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

*/





/* Función para abrir y cerrar nuevo carrito */

botonAbrirCarrito.addEventListener('click', abrirNuevoCarrito);

function abrirNuevoCarrito() {
  // Primero cargo los datos en el carrito
  newFillCart()

  // Si el carrito está vacío, deshabilito el botón para vaciar
  if (esteCarrito.length == 0) {
    botonVaciarCarrito.setAttribute("disabled", "")
  } else {
    botonVaciarCarrito.removeAttribute("disabled")
  }

  // Muestro el carrito en pantalla
  document.getElementById('nuevo-carrito').classList.toggle('mostrar');

}

// función para llenar el carrito de productos

function newFillCart() {
  carritoProductos.innerHTML = ''
  let totalFinal = 0
  const productosCarrito = JSON.parse(localStorage.getItem('carrito'))
  productosCarrito.forEach(producto => {
    carritoProductos.innerHTML += /* html */
      `
      <div class="nuevo-carrito__producto">
        <div class="nuevo-carrito__producto-cabecera">
          <p class="nuevo-carrito__producto-cabecera-nombre">${producto.nombre}</p>
          <button><i class="nuevo-carrito__producto-cabecera-eliminar bi bi-x"></i></button>
        </div>

        <div class="nuevo-carrito__producto-cuerpo">

          <img class="nuevo-carrito__producto-cuerpo-imagen" src="${producto.img}" alt="">

          <div class="nuevo-carrito__producto-cuerpo-botones">
            <button><i class="nuevo-carrito__producto-cuerpo-botones-aumentar bi bi-plus"></i></button>
            <button><i class="nuevo-carrito__producto-cuerpo-botones-disminuir bi bi-dash"></i></button>
          </div>

          <p class="nuevo-carrito__producto-cuerpo-cantidad">${producto.cantidad}</p>
        </div>
  
      </div>
      
      `
    totalFinal += (producto.cantidad * producto.precio)
  })
  carritoTotal.innerHTML = ''
  carritoTotal.innerHTML += `Total: $${totalFinal}`
}







// Condición para saber si el carrito está visible o no

let carritoVisible = () => document.getElementById('nuevo-carrito').classList.value.includes('mostrar')



