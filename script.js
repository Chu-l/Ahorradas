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

listaCategorias()

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

function listaCategorias() {
    let categorias = JSON.parse(localStorage.getItem("categorias"))
    for (let i=0 ; i < categorias.length ; i++) {
        document.getElementById('lista-categorias').innerHTML += `<p class="row">
    <span class="col">${categorias[i]}</span>
    <span class="col text-end">
        <a href="">Editar</a>
        <a href="">Eliminar</a>
    </span>
    </p>`
    }

}