let cursos = [
    { id: '1', nombre: 'Desarrollo de aplicaciones web', creditos: 7, profesorId: '1', estudiantes: ['1', '2'] },
    { id: '2', nombre: 'Sistemas de control', creditos: 6, profesorId: '2', estudiantes: ['1', '3'] },
    { id: '3', nombre: 'Internet de las cosas', creditos: 6, profesorId: '1', estudiantes: ['3', '2'] },
    { id: '4', nombre: 'Lenguaje de programación Python', creditos: 7, profesorId: '3', estudiantes: ['4', '2'] },
    { id: '5', nombre: 'Formulación y evaluación de proyectos', creditos: 5, profesorId: '2', estudiantes: ['5', '4'] }
];

// Funciones
const findAll = () => cursos;

const findById = (id) => cursos.find(curso => curso.id === String(id));

const add = (newCurso) => {
    const newId = (cursos.length + 1).toString();
    newCurso.id = newId;
    cursos.push(newCurso);
    return newCurso;
};

const save = (id, data) => {
    const index = cursos.findIndex(curso => curso.id === String(id));
    if (index !== -1) {
        cursos[index] = { ...cursos[index], ...data };
        return cursos[index];
    }
    return null;
};

const erase = (id) => {
    const index = cursos.findIndex(curso => curso.id === String(id));
    if (index !== -1) {
        cursos.splice(index, 1);
        return true;
    }
    return false;
};

const agregarEstudiante = (cursoId, estudianteId) => {
    const curso = findById(cursoId);
    if (curso && !curso.estudiantes.includes(estudianteId)) {
        curso.estudiantes.push(estudianteId);
        return true;
    }
    return false;
};

const eliminarEstudiante = (cursoId, estudianteId) => {
    const curso = findById(cursoId);
    if (curso) {
        curso.estudiantes = curso.estudiantes.filter(id => id !== estudianteId);
        return true;
    }
    return false;
};

const asignarProfesor = (cursoId, profesorId) => {
    const curso = findById(cursoId);
    if (curso) {
        curso.profesorId = profesorId;
        return true;
    }
    return false;
};

// Exportación de funciones
module.exports = {
    findAll,
    findById,
    add,
    save,
    erase,
    agregarEstudiante,
    eliminarEstudiante,
    asignarProfesor,
};
