// Datos iniciales

if (localStorage.getItem("categorias") === null) {
    let categorias = ['Comida', 'Servicios', 'Salidas', 'Educación', 'Transporte', 'Trabajo']
    localStorage.setItem('categorias', JSON.stringify(categorias))
}
if (localStorage.getItem("operaciones") === null) {
    let operaciones = []
    localStorage.setItem('operaciones', JSON.stringify(operaciones))
}
if (localStorage.getItem("contador") === null) {
    localStorage.setItem('contador', 0)
}

populateCategorias()

// Funciones show/hide

function showBalance() {
    hideAll()
    document.getElementById("seccion-balance").classList.remove('visually-hidden')
}

function showNuevaOperacion() {
    hideAll()
    document.getElementById("nueva-operacion").classList.remove('visually-hidden')
}

function showCategorias() {
    hideAll()
    document.getElementById("seccion-categorias").classList.remove('visually-hidden')
}

function showEditar(index) {
    hideAll()
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    document.getElementById("input-editar-categoria").setAttribute('placeholder', categorias[index])
    document.getElementById("boton-editar-categoria").setAttribute('onclick', `editarCategoria('${index}')`)
    document.getElementById("editar-categoria").classList.remove('visually-hidden')
}

function showReportes() {
    hideAll()
    if (getOperaciones().length > 0) {
        showOperacionesReportes()
    }
    document.getElementById("seccion-reportes").classList.remove('visually-hidden')
}

function hideAll() {
    document.getElementById("seccion-balance").classList.add('visually-hidden')
    document.getElementById("nueva-operacion").classList.add('visually-hidden')
    document.getElementById("editar-operacion").classList.add('visually-hidden')
    document.getElementById("seccion-categorias").classList.add('visually-hidden')
    document.getElementById("editar-categoria").classList.add('visually-hidden')
    document.getElementById("seccion-reportes").classList.add('visually-hidden')
}

function hideFilters() {
    document.getElementById("ocultar-filtros").classList.add('visually-hidden')
    document.getElementById("mostrar-filtros").classList.remove('visually-hidden')
    document.getElementById("filtros").classList.add('visually-hidden')
}

function showFilters() {
    document.getElementById("mostrar-filtros").classList.add('visually-hidden')
    document.getElementById("ocultar-filtros").classList.remove('visually-hidden')
    document.getElementById("filtros").classList.remove('visually-hidden')
}

function showOperaciones() {
    document.getElementById("operaciones-no-results").classList.add('visually-hidden')
    document.getElementById("operaciones-results").classList.remove('visually-hidden')
}

function showEditarOperacion(id) {
    hideAll()
    let operaciones = getOperaciones()
    document.getElementById("boton-editar-operacion").setAttribute('onclick', `editOperacion('${id}')`)
    document.getElementById("editar-operacion").classList.remove('visually-hidden')
}

function showOperacionesReportes() {
    document.getElementById("reportes-no-results").classList.add('visually-hidden')
    document.getElementById("reportes-results").classList.remove('visually-hidden')
}


// Mostrar Categorias

function populateCategorias() {

    let categorias = getCategorias()

    // select-categorias en filtros

    document.getElementById("filtros-categoria").innerHTML = ``
    document.getElementById("filtros-categoria").innerHTML +=
        `<option>Todas</option>`
    for (let i = 0; i < categorias.length; i++) {
        document.getElementById("filtros-categoria").innerHTML +=
            `<option value="${i}">${categorias[i]}</option>`
    }

    // select categorias en nueva operacion

    document.getElementById("nueva-operacion-categoria").innerHTML = ``
    for (let i = 0; i < categorias.length; i++) {
        document.getElementById("nueva-operacion-categoria").innerHTML +=
            `<option value="${i}">${categorias[i]}</option>`
    }

    // select categorias en editar operacion

    document.getElementById("editar-operacion-categoria").innerHTML = ``
    for (let i = 0; i < categorias.length; i++) {
        document.getElementById("editar-operacion-categoria").innerHTML +=
            `<option value="${i}">${categorias[i]}</option>`
    }

    // lista de categorias en seccion categorias

    document.getElementById("lista-categorias").innerHTML = ``
    for (let i = 0; i < categorias.length; i++) {
        document.getElementById("lista-categorias").innerHTML +=
            `<p class="row p-2 ">
    <span class="col"><mark class="text-white bg-success">${categorias[i]}</mark></span>
    <span class="col text-end">
        <a href="#" onclick="showEditar(${i})">Editar</a>
        <a href="#" onclick="eliminarCategoria(${i})">Eliminar</a>
    </span>
    </p>`
    }
}

//CRUD

function getCategorias() {
    return JSON.parse(localStorage.getItem("categorias"))
}

function getOperaciones() {
    return JSON.parse(localStorage.getItem("operaciones"))
}