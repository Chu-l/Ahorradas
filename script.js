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
    const categorias = JSON.parse(localStorage.getItem("categorias"))
    document.getElementById("input-editar-categoria").setAttribute('placeholder', categorias[index])
    document.getElementById("boton-editar-categoria").setAttribute('onclick', `editarCategoria('${index}')`)
    document.getElementById("editar-categoria").classList.remove('visually-hidden')
}

function showReportes() {
    hideAll()
    document.getElementById("seccion-reportes").classList.remove('visually-hidden')
}

function hideAll() {
    document.getElementById("seccion-balance").classList.add('visually-hidden')
    document.getElementById("nueva-operacion").classList.add('visually-hidden')
    document.getElementById("seccion-categorias").classList.add('visually-hidden')
    document.getElementById("editar-categoria").classList.add('visually-hidden')
    document.getElementById("seccion-reportes").classList.add('visually-hidden')
}

