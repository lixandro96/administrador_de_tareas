// variables
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas')
const eliminarBtn = document.querySelector('.borrar-tarea');

// eventListeners
formulario.addEventListener('submit', agregarTarea);
document.addEventListener('DOMContentLoaded',()=>{
  tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  mostrarTareas()
})

let tareas = []

// funciones
function agregarTarea(e){
  e.preventDefault()
  const tarea = document.querySelector('#tarea').value;

  if(tarea === ''){
    mensajeError('La tarea no puede estar vacía')
    return
  }
  const tareasObj = {
    id: Date.now(),
    texto: tarea
  }
  tareas = [...tareas, tareasObj]

  mostrarTareas()
  
}

function mensajeError(mensaje){
  const contenido = document.querySelector('#contenido');

  const error = document.createElement('P')
  error.classList.add('error')
  error.textContent = mensaje

  contenido.appendChild(error)
  setTimeout(() => {
    error.remove()
  }, 3000);
}

function mostrarTareas(){

  limpiarHTML() // limpia el html antes de mostrar las tareas
 
  tareas.forEach( tarea => {

    const {id,texto} = tarea
    const contenidoTarea = document.createElement('P')
    contenidoTarea.classList.add('tarea');
    contenidoTarea.textContent = texto;

    const borarTarea =  document.createElement('span');
    borarTarea.classList.add('borrar-tarea');
    borarTarea.textContent = 'Eliminar';
    borarTarea.dataset.id = id
    borarTarea.onclick = () => {
      eliminarTarea(tarea.id)
    }

    contenidoTarea.appendChild(borarTarea);

    listaTareas.appendChild(contenidoTarea)
  })
  sincronizarStorage()
  formulario.reset()
}

// funcion que limpai el html previo
function limpiarHTML(){

  while(listaTareas.firstChild){
    listaTareas.removeChild(listaTareas.firstChild)
  }
}

function eliminarTarea(id){

  tareas = tareas.filter(tarea => tarea.id !== id)
  mostrarTareas()
  
}

function sincronizarStorage(){

  localStorage.setItem('tareas',JSON.stringify(tareas))
}