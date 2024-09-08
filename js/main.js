// main.js
import { cargarTareas, guardarTareas } from './storage.js';

let listaDeTareas = [];
let tareaEditando = null; // Índice de la tarea que se está editando

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const closeButton = document.querySelector('.close-button');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskInput = document.getElementById('editTaskInput');
const editTaskDescription = document.getElementById('editTaskDescription');
const editTaskPriority = document.getElementById('editTaskPriority');

// Inicializar la aplicación
async function iniciarApp() {
    listaDeTareas = await cargarTareas();
    mostrarTareas();
}


function mostrarTareas() {
    taskList.innerHTML = '';

    if (listaDeTareas.length === 0) {
        taskList.innerHTML = '<li>No hay tareas en la lista.</li>';
    } else {
        listaDeTareas.forEach((item, index) => {
            const li = document.createElement('li');

            li.className = item.completada ? 'completed' : '';

            const tareaSpan = document.createElement('span');
            tareaSpan.textContent = `${item.tarea} (${item.prioridad}) - ${item.descripcion}`;

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'actions';

            
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            const completeIcon = document.createElement('i');
            completeIcon.className = item.completada ? 'fas fa-undo' : 'fas fa-check';
            completeBtn.appendChild(completeIcon);
            completeBtn.addEventListener('click', () => marcarComoCompletada(index));

            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            const editIcon = document.createElement('i');
            editIcon.className = 'fas fa-edit';
            editBtn.appendChild(editIcon);
            editBtn.addEventListener('click', () => abrirModalEdicion(index));

            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fas fa-trash-alt';
            deleteBtn.appendChild(deleteIcon);
            deleteBtn.addEventListener('click', () => eliminarTarea(index));

            actionsDiv.appendChild(completeBtn);
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(tareaSpan);
            li.appendChild(actionsDiv);

            taskList.appendChild(li);
        });
    }
}


function agregarTarea(tarea, descripcion, prioridad) {
    listaDeTareas.push({ tarea, descripcion, prioridad, completada: false });
    guardarTareas(listaDeTareas);
    mostrarTareas();
}


function marcarComoCompletada(index) {
    listaDeTareas[index].completada = !listaDeTareas[index].completada;
    guardarTareas(listaDeTareas);
    mostrarTareas();
}


function eliminarTarea(index) {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        listaDeTareas.splice(index, 1);
        guardarTareas(listaDeTareas);
        mostrarTareas();
    }
}


function abrirModalEdicion(index) {
    tareaEditando = index;
    const tarea = listaDeTareas[index];
    editTaskInput.value = tarea.tarea;
    editTaskDescription.value = tarea.descripcion;
    editTaskPriority.value = tarea.prioridad;
    editModal.style.display = 'block';
}


function cerrarModalEdicion() {
    tareaEditando = null;
    editTaskForm.reset();
    editModal.style.display = 'none';
}


function guardarCambiosEdicion(event) {
    event.preventDefault();
    if (tareaEditando === null) return;

    const tarea = editTaskInput.value.trim();
    const descripcion = editTaskDescription.value.trim();
    const prioridad = editTaskPriority.value;

    if (tarea && prioridad) { 
        listaDeTareas[tareaEditando].tarea = tarea;
        listaDeTareas[tareaEditando].descripcion = descripcion;
        listaDeTareas[tareaEditando].prioridad = prioridad;
        guardarTareas(listaDeTareas);
        mostrarTareas();
        cerrarModalEdicion();
    } else {
        alert('La tarea y la prioridad son obligatorias.');
    }
}

// Eventos
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskPriority = document.getElementById('taskPriority');

    const tarea = taskInput.value.trim();
    const descripcion = taskDescription.value.trim();
    const prioridad = taskPriority.value;

    if (tarea && prioridad) { 
        agregarTarea(tarea, descripcion, prioridad);
        taskInput.value = '';
        taskDescription.value = '';
        taskPriority.value = 'Alta';
    } else {
        alert('La tarea y la prioridad son obligatorias.');
    }
});


closeButton.addEventListener('click', cerrarModalEdicion);


window.addEventListener('click', (event) => {
    if (event.target == editModal) {
        cerrarModalEdicion();
    }
});


editTaskForm.addEventListener('submit', guardarCambiosEdicion);


document.addEventListener('DOMContentLoaded', iniciarApp);
