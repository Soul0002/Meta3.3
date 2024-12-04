let profesores = [
    { id: '1', matricula: '00000', nombre: 'Martín Olguín', cursos: [] },
    { id: '2', matricula: '00001', nombre: 'Maria Luisa', cursos: [] },
    { id: '3', matricula: '00002', nombre: 'Omar Muñoz', cursos: [] },
    { id: '4', matricula: '00003', nombre: 'Iván Anguiano', cursos: [] },
    { id: '5', matricula: '00004', nombre: 'Jesus Caro', cursos: [] },
];

// Funciones
const findAll = () => profesores;

const findById = (id) => profesores.find(profesor => profesor.id === String(id));

const findByMatricula = (matricula) => profesores.find(profesor => profesor.matricula === String(matricula));

const add = (newProfesor) => {
    const newId = (profesores.length + 1).toString();
    newProfesor.id = newId;
    profesores.push(newProfesor);
    return newProfesor;
};

const save = (id, data) => {
    const index = profesores.findIndex(profesor => profesor.id === String(id));
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...data };
        return profesores[index];
    }
    return null;
};

const erase = (id) => {
    const index = profesores.findIndex(profesor => profesor.id === String(id));
    if (index !== -1) {
        profesores.splice(index, 1);
        return true;
    }
    return false;
};

const agregarCurso = (profesorId, cursoId) => {
    const profesor = findById(profesorId);
    if (profesor && !profesor.cursos.includes(cursoId)) {
        profesor.cursos.push(cursoId);
        return true;
    }
    return false;
};

const eliminarCurso = (profesorId, cursoId) => {
    const profesor = findById(profesorId);
    if (profesor) {
        profesor.cursos = profesor.cursos.filter(id => id !== cursoId);
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
    agregarCurso,
    eliminarCurso,
};
