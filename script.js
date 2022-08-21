// DATOS INICIALES

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
populateOperaciones()

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

// Mostrar Operaciones

function populateOperaciones() {
    let operaciones = getOperaciones()
    renderOperaciones(operaciones)
}

function renderOperaciones(operaciones) {
    if (operaciones.length > 0) {
        document.getElementById("operaciones-no-results").classList.add('visually-hidden')
        document.getElementById("operaciones-results").classList.remove('visually-hidden')
        showOperaciones()
        document.getElementById("operaciones-results").innerHTML =
        `<tr>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Acciones</th>
        </tr>`
        for (let i = 0; i < operaciones.length; i++) {
            document.getElementById("operaciones-results").innerHTML +=
            `<tr>
                <td>${operaciones[i].descripcion}</td>
                <td><mark class="text-white bg-success">${operaciones[i].categoria}</mark></td>
                <td>${operaciones[i].fecha}</td>
                <td>${operaciones[i].monto}</td>
                <td>
                    <a href="#" onclick="showEditarOperacion(${operaciones[i].id})">Editar</a>
                    <a href="#" onclick="deleteOperacion(${operaciones[i].id})">Eliminar</a>
                </td>
            </tr>`
        }
    }
    else {
        document.getElementById("operaciones-results").classList.add('visually-hidden')
        document.getElementById("operaciones-no-results").classList.remove('visually-hidden')
    }
}

// FUNCIONES CRUD

// Categorias

function getCategorias() {
    return JSON.parse(localStorage.getItem("categorias"))
}

function newCategoria() {
    let categoria = document.getElementById("agregar-categoria").value
    if (categoria != '') {
        let categorias = JSON.parse(localStorage.getItem("categorias")).concat([categoria])
        localStorage.removeItem('categorias')
        localStorage.setItem('categorias', JSON.stringify(categorias))
        populateCategorias()
    }
}

function editarCategoria(index) {
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    categorias[index] = document.getElementById("input-editar-categoria").value
    localStorage.removeItem('categorias')
    localStorage.setItem('categorias', JSON.stringify(categorias))
    populateCategorias()
    showCategorias()
}

function eliminarCategoria(index) {
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    categorias.splice(index, 1)
    localStorage.removeItem('categorias')
    localStorage.setItem('categorias', JSON.stringify(categorias))
    populateCategorias()
}

// Operaciones

function getOperaciones() {
    return JSON.parse(localStorage.getItem("operaciones"))
}

function newOperacion() {
    let count = localStorage.getItem("contador")
    let operacion = {
        id: count,
        descripcion: document.getElementById('nueva-operacion-descripcion').value,
        monto: document.getElementById("nueva-operacion-monto").value,
        tipo: getValueFromSelect("nueva-operacion-tipo"),
        categoria: getValueFromSelect("nueva-operacion-categoria"),
        fecha: document.getElementById("nueva-operacion-fecha").value
    }
    let operaciones = getOperaciones().concat([operacion])
    localStorage.setItem('operaciones', JSON.stringify(operaciones))
    localStorage.setItem('contador', parseInt(count) + 1)
    populateOperaciones()
    showBalance()
}

function getOperacionById(id) {
    let operaciones = getOperaciones()
    for (let i = 0; i < operaciones.length; i++) {
        if (operaciones[i].id == id) {
            return operaciones[i]
        }
    }
}

function editOperacion(id) {
    let operacion = getOperacionById(id)
    let descripcion = document.getElementById('editar-operacion-descripcion').value
    let monto = document.getElementById("editar-operacion-monto").value
    let tipo = getValueFromSelect("editar-operacion-tipo")
    let categoria = getValueFromSelect("editar-operacion-categoria")
    let fecha = document.getElementById("editar-operacion-fecha").value
    if(descripcion != '') {
        operacion.descripcion = descripcion
    }
    if(monto != '') {
        operacion.monto = monto
    }
    if(tipo != '') {
        operacion.tipo = tipo
    }
    if(categoria != '') {
        operacion.categoria = categoria
    }
    if(fecha != '') {
        operacion.fecha = fecha
    }
    let operaciones = getOperaciones()
    operaciones.splice(operaciones.indexOf(operacion), 1)
    localStorage.removeItem('operaciones')
    localStorage.setItem('operaciones', JSON.stringify(operaciones.concat([operacion])))
    populateOperaciones()
    showBalance()
}

function deleteOperacion(id) {
    let operaciones = getOperaciones()
    operaciones.splice(operaciones.indexOf(getOperacionById(id)), 1)
    localStorage.removeItem('operaciones')
    localStorage.setItem('operaciones', JSON.stringify(operaciones))
    populateOperaciones()
}

// UTILS

function getValueFromSelect(id) {
    let select = document.getElementById(id);
    let value = select.options[select.selectedIndex].text
    return value
}