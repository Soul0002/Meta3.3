const estudiantes = require('../models/estudiantesModels');

const getAllEstudiantes = (req, res) => {
    const listaEstudiantes = estudiantes.findAll();
    res.status(200).json(listaEstudiantes);
};

const getEstudiante = (req, res) => {
    const estudiante = estudiantes.findById(req.params.id);
    if (estudiante) {
        res.status(200).json(estudiante);
    } else {
        res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
    }
};

const createEstudiante = (req, res) => {
    const nuevoEstudiante = req.body;
    if (!nuevoEstudiante.matricula || !nuevoEstudiante.nombre || !nuevoEstudiante.semestre || !nuevoEstudiante.creditos) {
        return res.status(400).json({ error: "Datos incompletos para crear el estudiante." });
    }
    const estudianteCreado = estudiantes.add(nuevoEstudiante);
    res.status(201).json(estudianteCreado);
};

const updateEstudiante = (req, res) => {
    const actualizado = estudiantes.save(req.params.id, req.body);
    if (actualizado) {
        res.status(200).json(actualizado);
    } else {
        res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
    }
};

const deleteEstudiante = (req, res) => {
    if (estudiantes.erase(req.params.id)) {
        res.status(200).json({ msg: `Estudiante con id ${req.params.id} eliminado exitosamente` });
    } else {
        res.status(404).json({ error: `Estudiante con id ${req.params.id} no encontrado` });
    }
};

const getEstudianteById = (req, res) => {
    const estudiante = estudiantes.findById(req.params.id);
    if (estudiante) {
        res.status(200).json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
};

const getEstudianteByMatricula = (req, res) => {
    const matricula = req.params.matricula;
    const estudiante = estudiantes.findByMatricula(matricula);
    if (estudiante) {
        res.status(200).json(estudiante);
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
};

const patchEstudiante = (req, res) => {
    const id = req.params.id;
    const datosParciales = req.body;

    const estudiante = estudiantes.findById(id);
    if (!estudiante) {
        return res.status(404).send('Estudiante no encontrado');
    }

    const actualizado = estudiantes.save(id, datosParciales);
    if (actualizado) {
        res.status(200).send('Estudiante actualizado exitosamente');
    } else {
        res.status(400).send('No se pudo modificar el estudiante');
    }
};

module.exports = {
    getAllEstudiantes,
    getEstudiante,
    getEstudianteById,
    getEstudianteByMatricula,
    createEstudiante,
    updateEstudiante,
    patchEstudiante,
    deleteEstudiante,
};
