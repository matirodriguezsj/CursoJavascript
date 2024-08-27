
export function cargarTareas() {
    const tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}

export function guardarTareas(listaDeTareas) {
    localStorage.setItem('tareas', JSON.stringify(listaDeTareas));
}
