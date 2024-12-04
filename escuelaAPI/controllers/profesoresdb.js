const { Profesor, Curso } = require('../models/relaciones'); // Se importa Curso para las relaciones

// Obtener todos los profesores
const getProfesores = async (req, res) => {
    try {
        const allProfesores = await Profesor.findAll({ include: Curso }); // Incluye cursos relacionados
        res.status(200).json(allProfesores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
};

// Obtener un profesor por ID
const getProfesorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const profesor = await Profesor.findByPk(id, { include: Curso }); // Incluye cursos relacionados
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(profesor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el profesor' });
    }
};

// Crear un nuevo profesor
const createProfesor = async (req, res) => {
    const { matricula, nombre } = req.body;

    if (!matricula || !nombre) {
        return res.status(400).json({ error: 'Datos incompletos. Se requiere matrícula y nombre del profesor' });
    }

    try {
        const nuevoProfesor = await Profesor.create(req.body);
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'La matrícula ya está en uso' });
        } else {
            res.status(500).json({ error: 'Error al crear el profesor' });
        }
    }
};

// Actualizar un profesor por ID
const updateProfesor = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        await profesor.update(datosActualizados);
        res.status(200).json({ message: 'Profesor actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el profesor' });
    }
};

// Modificar parcialmente un profesor por ID
const patchProfesor = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        await profesor.update(datosParciales);
        res.status(200).json({ message: 'Profesor modificado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al modificar el profesor' });
    }
};

// Eliminar un profesor por ID
const deleteProfesor = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({ error: `Profesor no encontrado con ID ${id}` });
        }

        await profesor.destroy();
        res.status(200).json({ message: `Profesor con ID ${id} eliminado exitosamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al intentar eliminar el profesor' });
    }
};

// Agregar un curso a un profesor
const agregarCursoAProfesor = async (req, res) => {
    const { profesorId, cursoId } = req.body;

    try {
        const profesor = await Profesor.findByPk(profesorId);
        const curso = await Curso.findByPk(cursoId);

        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        await profesor.addCurso(curso); // Relación muchos a muchos
        res.status(200).json({ message: `Curso ${cursoId} agregado al profesor ${profesorId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el curso al profesor' });
    }
};

// Eliminar un curso de un profesor
const eliminarCursoDeProfesor = async (req, res) => {
    const { profesorId, cursoId } = req.body;

    try {
        const profesor = await Profesor.findByPk(profesorId);
        const curso = await Curso.findByPk(cursoId);

        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        await profesor.removeCurso(curso); // Relación muchos a muchos
        res.status(200).json({ message: `Curso ${cursoId} eliminado del profesor ${profesorId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el curso del profesor' });
    }
};

module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    patchProfesor,
    deleteProfesor,
    agregarCursoAProfesor,
    eliminarCursoDeProfesor
};
