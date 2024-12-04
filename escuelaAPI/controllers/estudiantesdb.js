const { Estudiante } = require('../models/relaciones');

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

// Obtener un estudiante por ID
const getEstudianteById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

// Obtener un estudiante por matrícula
const getEstudianteByMatricula = async (req, res) => {
    const matricula = req.params.matricula;
    try {
        const estudiante = await Estudiante.findOne({ where: { matricula } });
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    const { matricula, nombre, semestre, creditos } = req.body;

    if (!matricula || !nombre || !semestre) {
        return res.status(400).json({ error: 'Datos incompletos. Se requiere matrícula, nombre y semestre' });
    }

    try {
        const nuevoEstudiante = await Estudiante.create({ matricula, nombre, semestre, creditos });
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el estudiante' });
    }
};

// Actualizar un estudiante por ID
const updateEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosActualizados = req.body;

    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        await estudiante.update(datosActualizados);
        res.status(200).json({ message: 'Estudiante actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

// Modificar parcialmente un estudiante por ID
const patchEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;

    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        await estudiante.update(datosParciales);
        res.status(200).json({ message: 'Estudiante actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

// Eliminar un estudiante por ID
const deleteEstudiante = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: `Estudiante no encontrado con ID ${id}` });
        }

        await estudiante.destroy();
        res.status(200).json({ message: `Estudiante con ID ${id} eliminado exitosamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al intentar eliminar el estudiante' });
    }
};

module.exports = {
    getEstudiantes,
    getEstudianteById,
    getEstudianteByMatricula,
    createEstudiante,
    updateEstudiante,
    patchEstudiante,
    deleteEstudiante,
};
