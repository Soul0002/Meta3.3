const cursos = require('../models/cursosModels');
const estudiantes = require('../models/estudiantesModels');
const profesores = require('../models/profesoresModels');

const getCursos = (req, res) => {
    res.status(200).json(cursos.findAll());
};

const getCursoById = (req, res) => {
    const id = req.params.id; // IDs manejados como cadenas
    const curso = cursos.findById(id);
    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }
    res.status(200).json(curso);
};

const createCurso = (req, res) => {
    const { nombre, creditos, profesorId } = req.body;
    if (!nombre || !creditos || !profesorId) {
        return res.status(400).send('Faltan datos para crear el curso');
    }
    const nuevoCurso = cursos.add(req.body);
    res.status(201).json(nuevoCurso);
};

const updateCurso = (req, res) => {
    const id = req.params.id;
    const actualizado = cursos.save(id, req.body);
    if (actualizado) {
        res.status(200).json(actualizado);
    } else {
        res.status(404).send('Curso no encontrado');
    }
};

const deleteCurso = (req, res) => {
    const id = req.params.id;
    if (cursos.erase(id)) {
        res.status(200).send(`Curso con ID ${id} eliminado`);
    } else {
        res.status(404).send('Curso no encontrado');
    }
};

const inscribirEstudiante = (req, res) => {
    const { estudianteId, cursoId } = req.body;
    if (!cursos.agregarEstudiante(cursoId, estudianteId)) {
        return res.status(400).send('No se pudo inscribir al estudiante');
    }
    res.status(200).send('Estudiante inscrito en el curso correctamente');
};

const eliminarEstudiante = (req, res) => {
    const { estudianteId, cursoId } = req.body;
    if (!cursos.eliminarEstudiante(cursoId, estudianteId)) {
        return res.status(400).send('No se pudo eliminar al estudiante del curso');
    }
    res.status(200).send('Estudiante eliminado del curso correctamente');
};

const asignarProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    if (!cursos.asignarProfesor(cursoId, profesorId)) {
        return res.status(400).send('No se pudo asignar el profesor');
    }
    res.status(200).send('Profesor asignado al curso correctamente');
};

const patchCurso = (req, res) => {
    const id = req.params.id; // IDs manejados como cadenas
    const datosParciales = req.body;

    const curso = cursos.findById(id);
    if (!curso) {
        return res.status(404).send('Curso no encontrado');
    }

    const actualizado = cursos.save(id, datosParciales);
    if (actualizado) {
        res.status(200).json(actualizado);
    } else {
        res.status(400).send('No se pudo modificar el curso');
    }
};

const eliminarProfesorDeCurso = (req, res) => {
    const { profesorId, cursoId } = req.body;
    const curso = cursos.findById(cursoId);

    if (curso && curso.profesorId === profesorId) {
        curso.profesorId = null;  // Desasignar el profesor
        res.status(200).send(`Profesor con ID ${profesorId} eliminado del curso con ID ${cursoId}`);
    } else {
        res.status(404).send('No se pudo encontrar el curso o el profesor no está asignado');
    }
};

const getCursosDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    const cursosDelEstudiante = cursos.findAll().filter(curso => estudiante.cursos.includes(curso.id));
    res.status(200).json(cursosDelEstudiante);
};

const getProfesoresDeEstudiante = (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    const estudiante = estudiantes.findById(estudianteId);

    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    const profesoresDeEstudiante = [];
    estudiante.cursos.forEach(cursoId => {
        const curso = cursos.findById(cursoId);
        if (curso && curso.profesorId) {
            const profesor = profesores.findById(curso.profesorId);
            if (profesor && !profesoresDeEstudiante.includes(profesor)) {
                profesoresDeEstudiante.push(profesor);
            }
        }
    });

    res.status(200).json(profesoresDeEstudiante);
};

const getCursosDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    const profesor = profesores.findById(profesorId);

    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    const cursosDelProfesor = cursos.findAll().filter(curso => curso.profesorId === profesorId);
    res.status(200).json(cursosDelProfesor);
};

const getEstudiantesDeProfesor = (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    const profesor = profesores.findById(profesorId);

    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    const estudiantesDeProfesor = [];
    const cursosDelProfesor = cursos.findAll().filter(curso => curso.profesorId === profesorId);
    cursosDelProfesor.forEach(curso => {
        curso.estudiantes.forEach(estudianteId => {
            const estudiante = estudiantes.findById(estudianteId);
            if (estudiante && !estudiantesDeProfesor.includes(estudiante)) {
                estudiantesDeProfesor.push(estudiante);
            }
        });
    });

    res.status(200).json(estudiantesDeProfesor);
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    inscribirEstudiante,
    eliminarEstudiante,
    asignarProfesor,
    patchCurso,
    eliminarProfesorDeCurso,
    getCursosDeEstudiante,
    getProfesoresDeEstudiante,
    getCursosDeProfesor,
    getEstudiantesDeProfesor
};
