const { Curso, Alumno, Profesor } = require('../models/relaciones');

const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.findAll({ include: [Alumno, Profesor] });
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).send('Error al obtener los cursos');
    }
};

const getCursoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const curso = await Curso.findByPk(id, { include: [Alumno, Profesor] });
        if (!curso) {
            return res.status(404).send('Curso no encontrado');
        }
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).send('Error al obtener el curso');
    }
};

const createCurso = async (req, res) => {
    try {
        const nuevoCurso = await Curso.create(req.body);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(500).send('Error al crear el curso');
    }
};

const updateCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).send('Curso no encontrado');
        }
        await curso.update(req.body);
        res.status(200).send('Curso actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el curso');
    }
};

const patchCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).send('Curso no encontrado');
        }
        await curso.update(req.body);
        res.status(200).send('Curso modificado');
    } catch (error) {
        res.status(500).send('Error al modificar el curso');
    }
};

const deleteCurso = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            return res.status(404).send('Curso no encontrado');
        }
        await curso.destroy();
        res.status(200).send('Curso eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el curso');
    }
};

const inscribirEstudiante = async (req, res) => {
    const { estudianteId, cursoId } = req.body;
    try {
        const curso = await Curso.findByPk(cursoId);
        const estudiante = await Alumno.findByPk(estudianteId);

        if (!curso || !estudiante) {
            return res.status(404).send('Curso o estudiante no encontrado');
        }

        await curso.addAlumno(estudiante);
        res.status(200).send('Estudiante inscrito correctamente en el curso');
    } catch (error) {
        res.status(500).send('Error al inscribir al estudiante en el curso');
    }
};

const eliminarEstudiante = async (req, res) => {
    const { estudianteId, cursoId } = req.body;
    try {
        const curso = await Curso.findByPk(cursoId);
        const estudiante = await Alumno.findByPk(estudianteId);

        if (!curso || !estudiante) {
            return res.status(404).send('Curso o estudiante no encontrado');
        }

        await curso.removeAlumno(estudiante);
        res.status(200).send('Estudiante eliminado correctamente del curso');
    } catch (error) {
        res.status(500).send('Error al eliminar al estudiante del curso');
    }
};

const asignarProfesor = async (req, res) => {
    const { profesorId, cursoId } = req.body;
    try {
        const curso = await Curso.findByPk(cursoId);
        const profesor = await Profesor.findByPk(profesorId);

        if (!curso || !profesor) {
            return res.status(404).send('Curso o profesor no encontrado');
        }

        await curso.addProfesor(profesor);
        res.status(200).send('Profesor asignado correctamente al curso');
    } catch (error) {
        res.status(500).send('Error al asignar al profesor al curso');
    }
};

const eliminarProfesorDeCurso = async (req, res) => {
    const { profesorId, cursoId } = req.body;
    try {
        const curso = await Curso.findByPk(cursoId);
        const profesor = await Profesor.findByPk(profesorId);

        if (!curso || !profesor) {
            return res.status(404).send('Curso o profesor no encontrado');
        }

        await curso.removeProfesor(profesor);
        res.status(200).send('Profesor eliminado correctamente del curso');
    } catch (error) {
        res.status(500).send('Error al eliminar al profesor del curso');
    }
};

const getCursosDeEstudiante = async (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    try {
        const estudiante = await Alumno.findByPk(estudianteId, { include: Curso });

        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        res.status(200).json(estudiante.Cursos);
    } catch (error) {
        res.status(500).send('Error al obtener los cursos del estudiante');
    }
};

const getProfesoresDeEstudiante = async (req, res) => {
    const estudianteId = parseInt(req.params.estudianteId);
    try {
        const estudiante = await Alumno.findByPk(estudianteId, { include: { model: Curso, include: Profesor } });

        if (!estudiante || !estudiante.Cursos) {
            return res.status(404).send('Estudiante o cursos no encontrados');
        }

        const profesores = estudiante.Cursos.flatMap(curso => curso.Profesores);
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).send('Error al obtener los profesores del estudiante');
    }
};

const getCursosDeProfesor = async (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    try {
        const profesor = await Profesor.findByPk(profesorId, { include: Curso });

        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }

        res.status(200).json(profesor.Cursos);
    } catch (error) {
        res.status(500).send('Error al obtener los cursos del profesor');
    }
};

const getEstudiantesDeProfesor = async (req, res) => {
    const profesorId = parseInt(req.params.profesorId);
    try {
        const profesor = await Profesor.findByPk(profesorId, { include: { model: Curso, include: Alumno } });

        if (!profesor || !profesor.Cursos) {
            return res.status(404).send('Profesor o cursos no encontrados');
        }

        const estudiantes = profesor.Cursos.reduce((acc, curso) => acc.concat(curso.Alumnos), []);
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).send('Error al obtener los estudiantes del profesor');
    }
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    patchCurso,
    deleteCurso,
    inscribirEstudiante,
    eliminarEstudiante,
    asignarProfesor,
    eliminarProfesorDeCurso,
    getCursosDeEstudiante,
    getProfesoresDeEstudiante,
    getCursosDeProfesor,
    getEstudiantesDeProfesor,
};
