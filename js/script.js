/*    Elementos del DOM   */
const container = document.querySelector('#middleContainer')
const botonAbrirCarrito = document.querySelector('#botonCarrito')
const buscador = document.querySelector('#buscador')
const filtro = document.querySelector('#filtro')
const numeroCarrito = document.querySelector('#numeroCarrito')
const botonVaciarCarrito = document.querySelector('#vaciarCarrito')
const botonComprarCarrito = document.querySelector('#comprarCarrito')
const carritoProductos = document.querySelector('#carritoProductos')
const carritoTotal = document.querySelector('#carritoTotal')

/* Variables Globales */

// Obtengo el carrito anterior o inicializo uno vacío
let esteCarrito = JSON.parse(localStorage.getItem('carrito')) || []

// Booleano para saber si el carrito está visible o no
let carritoVisible = () => document.getElementById('nuevo-carrito').classList.value.includes('mostrar')


/*    Productos desde JSON   */
let baseDeDatos
async function fetchDataRender() {
  const response = await fetch("./productos.json")
  baseDeDatos = await response.json()
  renderProducts(baseDeDatos)
}


/*    Eventos   */
function agregarEventListeners() {
  // Input del buscador
  buscador.addEventListener('input', evt => buscarProductos(evt))

  // Input para filtrar
  filtro.addEventListener('input', evt => filtrarProductos(evt))

  // Botón para abrir-cerrar carrito
  botonAbrirCarrito.addEventListener('click', abrirNuevoCarrito);

  // Botón para comprar el carrito
  botonComprarCarrito.addEventListener('click', comprarCarrito)

  // Botón para vaciar el carrito
  botonVaciarCarrito.addEventListener('click', vaciarCarrito)

  // Registro los clicks dentro del carrito
  carritoProductos.addEventListener('click', evt => modificarCarrito(evt))
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

  // Muestro un Toast de confirmación
  Toastify({
    text: "Agredado al carrito",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "rgb(85, 86, 106)",
      background: "radial-gradient(circle, rgba(85,86,106,1) 0%, rgba(85,86,106,1) 50%, rgba(40,40,52,1) 100%)",
      'font-family': "Verdana, sans-serif",
      border: '1px solid white',
      'border-radius': '15px'
    }
  }).showToast();

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
  // Cierro el carrito
  document.getElementById('nuevo-carrito').classList.remove('mostrar')

  esteCarrito = []
  localStorage.setItem('carrito', JSON.stringify([]))
  numeroCarrito.innerHTML = 0
}

// Función para comprar el carrito
function comprarCarrito() {
  // Cierro el carrito
  document.getElementById('nuevo-carrito').classList.remove('mostrar')

  // Verifico que el carrito no esté vacío
  if (esteCarrito.length == 0) {

    // Si el carrito está vacío, muestro un error
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Su carrito está vacío",
    });

    return
  }

  // Muestro un alert confirmando la compra
  Swal.fire({
    title: "Compra Realizada!",
    icon: "success"
  });

  // Limpio el carrito
  vaciarCarrito()
}

// Función del buscador
function buscarProductos(evt) {
  const busqueda = evt.target.value.toLowerCase()
  const resultado = baseDeDatos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda)
  )
  renderProducts(resultado)
}

// Función para filtrar
function filtrarProductos(evt) {
  const seleccion = evt.target.value
  const resultado = baseDeDatos.filter(producto =>
    producto.categoria.includes(seleccion)
  )
  renderProducts(resultado)
}

/* Función para abrir y cerrar nuevo carrito */
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


  // Condición para verificar si el carrito está vacío
  // Si el carrito está vacío, muestro un carrito vacío
  if (productosCarrito.length === 0) {

    carritoProductos.innerHTML = /* html */
      `
    <div class="nuevo-carrito__productos--carrito-vacio">
      <img src="img/sad-cart.png" alt="Imágen carrito vacío">
      <p class="nuevo-carrito__productos--carrito-vacio-texto">Tu carrito está vacío</p>
    </div>
    `

    carritoTotal.innerHTML = ''
    carritoTotal.innerHTML += `Carrito Vacío`
    return
  }

  productosCarrito.forEach(producto => {
    carritoProductos.innerHTML += /* html */
      `
        <div class="nuevo-carrito__producto">
          <div class="nuevo-carrito__producto-cabecera">
            <p class="nuevo-carrito__producto-cabecera-nombre">${producto.nombre}</p>
            <button class="nuevo-carrito__producto-cabecera-eliminar" productid='${producto.id}'><i class="nuevo-carrito__producto-cabecera-eliminar bi bi-x"></i></button>
          </div>
  
          <div class="nuevo-carrito__producto-cuerpo">
  
            <img class="nuevo-carrito__producto-cuerpo-imagen" src="${producto.img}" alt="">
  
            <div class="nuevo-carrito__producto-cuerpo-botones">
              <button class="nuevo-carrito__producto-cuerpo-botones-aumentar" productid='${producto.id}'><i class="nuevo-carrito__producto-cuerpo-botones-aumentar bi bi-plus"></i></button>
              <button class="nuevo-carrito__producto-cuerpo-botones-disminuir" productid='${producto.id}'><i class="nuevo-carrito__producto-cuerpo-botones-disminuir bi bi-dash" ></i></button>
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

// Función para modificar valores desde el carrito
function modificarCarrito(evt) {

  // si el click fue en el botón para eliminar
  if (evt.target.classList.contains('nuevo-carrito__producto-cabecera-eliminar')) {
    eliminarProducto(evt)//función eliminar
  }


  // si el click fue en el botón +
  if (evt.target.classList.contains('nuevo-carrito__producto-cuerpo-botones-aumentar')) {
    aumentarProducto(evt)  // llamo función aumentar
  }


  // si el click fue en el botón -
  if (evt.target.classList.contains('nuevo-carrito__producto-cuerpo-botones-disminuir')) {
    disminuirProducto(evt)  // llamo función disminuir
  }

}

// Función para eliminar un producto del carrito
function eliminarProducto(evt) {
  //obtengo el id del producto del carrito
  const botonId = evt.target.getAttribute('productid')


  //con ese id obtengo el indice del objeto en la base
  const index = baseDeDatos.findIndex(producto => producto.id == botonId)


  //con ese indice obtengo el objeto de la base
  const productoSeleccionado = baseDeDatos[index]


  //obtengo el indice de este objeto en el carrito actual
  const indexCarrito = esteCarrito.findIndex(prod => prod.id == productoSeleccionado.id)


  // elimino el producto
  esteCarrito.splice(indexCarrito, 1)




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

// Función para sumar una unidad a un producto del carrito
function aumentarProducto(evt) {
  //obtengo el id del producto del carrito
  const botonId = evt.target.getAttribute('productid')


  //con ese id obtengo el indice del objeto en la base
  const index = baseDeDatos.findIndex(producto => producto.id == botonId)


  //con ese indice obtengo el objeto de la base
  const productoSeleccionado = baseDeDatos[index]


  //obtengo el indice de este objeto en el carrito actual
  const indexCarrito = esteCarrito.findIndex(prod => prod.id == productoSeleccionado.id)

  // le aumento la cantidad en uno a este objeto
  esteCarrito[indexCarrito].cantidad += 1






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

// Función para restar una unidad a un producto del carrito
function disminuirProducto(evt) {
  //obtengo el id del producto del carrito
  const botonId = evt.target.getAttribute('productid')


  //con ese id obtengo el indice del objeto en la base
  const index = baseDeDatos.findIndex(producto => producto.id == botonId)


  //con ese indice obtengo el objeto de la base
  const productoSeleccionado = baseDeDatos[index]


  //obtengo el indice de este objeto en el carrito actual
  const indexCarrito = esteCarrito.findIndex(prod => prod.id == productoSeleccionado.id)


  // si la cantidad es mayor a 1 
  if (esteCarrito[indexCarrito].cantidad > 1) {
    // le disminuyo la cantidad en uno a este objeto
    esteCarrito[indexCarrito].cantidad -= 1
  } else {
    // si no elimino el producto
    esteCarrito.splice(indexCarrito, 1)
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

// Función para inicializar
function inicializar() {
  // Obtengo los productos desde el JSON y los renderizo
  fetchDataRender()

  // Añado los escuchadores
  agregarEventListeners()

  // Actualizo el número del carrito
  cartNumber()
}







/* Inicialización */
inicializar()