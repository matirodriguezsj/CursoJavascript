
export async function cargarTareas() {
    try {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        if (!tareas) {
            const response = await fetch('./js/tareas.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            tareas = await response.json();
            guardarTareas(tareas);
        }
        return tareas;
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
        return [];
    }
}

export function guardarTareas(listaDeTareas) {
    try {
        localStorage.setItem('tareas', JSON.stringify(listaDeTareas));
    } catch (error) {
        console.error('Error al guardar las tareas:', error);
    }
}
