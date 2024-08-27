
import { cargarTareas, guardarTareas } from './storage.js';

let listaDeTareas = cargarTareas();

function agregarTarea(tarea, descripcion, prioridad) {
    listaDeTareas.push({ tarea: tarea, descripcion: descripcion, prioridad: prioridad, completada: false });
    guardarTareas(listaDeTareas);
    mostrarTareas();
}

function mostrarTareas() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    if (listaDeTareas.length === 0) {
        taskList.innerHTML = '<li>No hay tareas en la lista.</li>';
    } else {
        listaDeTareas.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.tarea} (${item.prioridad}) - ${item.descripcion}</span>
                <div class="actions">
                    <button onclick="window.marcarComoCompletada(${index})">
                        <i class="fas ${item.completada ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button onclick="window.editarTarea(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="window.eliminarTarea(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            if (item.completada) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
}

window.marcarComoCompletada = function (index) {
    listaDeTareas[index].completada = !listaDeTareas[index].completada;
    guardarTareas(listaDeTareas);
    mostrarTareas();
}

window.editarTarea = function (index) {
    const tareaNueva = prompt("Ingrese la nueva tarea:", listaDeTareas[index].tarea);
    const descripcionNueva = prompt("Ingrese la nueva descripción:", listaDeTareas[index].descripcion);
    const prioridadNueva = prompt("Ingrese la nueva prioridad (Alta, Media, Baja):", listaDeTareas[index].prioridad);
    if (tareaNueva && descripcionNueva && prioridadNueva) {
        listaDeTareas[index].tarea = tareaNueva;
        listaDeTareas[index].descripcion = descripcionNueva;
        listaDeTareas[index].prioridad = prioridadNueva;
        guardarTareas(listaDeTareas);
        mostrarTareas();
    }
}

window.eliminarTarea = function (index) {
    listaDeTareas.splice(index, 1);
    guardarTareas(listaDeTareas);
    mostrarTareas();
}

document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskPriority = document.getElementById('taskPriority');
    const tarea = taskInput.value.trim();
    const descripcion = taskDescription.value.trim();
    const prioridad = taskPriority.value;
    if (tarea && descripcion && prioridad) {
        agregarTarea(tarea, descripcion, prioridad);
        taskInput.value = '';
        taskDescription.value = '';
        taskPriority.value = 'Alta';
    }
});

document.addEventListener('DOMContentLoaded', mostrarTareas);
