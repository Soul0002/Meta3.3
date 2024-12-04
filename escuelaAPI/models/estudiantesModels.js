let estudiantes = [
    { id: '1', matricula: '12345', nombre: 'Juan Perez', semestre: '2022-1', creditos: 30, cursos: [1, 2] },
    { id: '2', matricula: '54321', nombre: 'Maria Gomez', semestre: '2022-2', creditos: 25, cursos: [2, 3] },
    { id: '3', matricula: '67890', nombre: 'Luis Martinez', semestre: '2022-1', creditos: 35, cursos: [3, 4] },
    { id: '4', matricula: '09876', nombre: 'Ana Torres', semestre: '2023-1', creditos: 20, cursos: [4, 5] },
    { id: '5', matricula: '11223', nombre: 'Carlos Sanchez', semestre: '2023-2', creditos: 15, cursos: [1, 5] }
];

const findAll = () => estudiantes;

const findById = (id) => estudiantes.find(e => e.id === String(id));

const findByMatricula = (matricula) => estudiantes.find(e => e.matricula === String(matricula));

const add = (newEstudiante) => {
    const newId = (estudiantes.length + 1).toString();
    newEstudiante.id = newId;
    estudiantes.push(newEstudiante);
    return newEstudiante;
};

const save = (id, data) => {
    const index = estudiantes.findIndex(e => e.id === String(id));
    if (index !== -1) {
        estudiantes[index] = { ...estudiantes[index], ...data };
        return estudiantes[index];
    }
    return null;
};

const erase = (id) => {
    const index = estudiantes.findIndex(e => e.id === String(id));
    if (index !== -1) {
        estudiantes.splice(index, 1);
        return true;
    }
    return false;
};

const inscribirEnCurso = (estudianteId, cursoId) => {
    const estudiante = findById(estudianteId);
    if (estudiante && !estudiante.cursos.includes(cursoId)) {
        estudiante.cursos.push(cursoId);
        return true;
    }
    return false;
};

const eliminarDeCurso = (estudianteId, cursoId) => {
    const estudiante = findById(estudianteId);
    if (estudiante) {
        estudiante.cursos = estudiante.cursos.filter(curso => curso !== cursoId);
        return true;
    }
    return false;
};

module.exports = {
    findAll,
    findById,
    findByMatricula,
    add,
    save,
    erase,
    inscribirEnCurso,
    eliminarDeCurso,
};
