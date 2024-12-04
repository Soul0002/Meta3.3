const profesoresModel = require('../models/profesoresModels');

const getAllProfesores = (req, res) => {
    const profesores = profesoresModel.findAll();
    res.status(200).json(profesores);
};

const getProfesor = (req, res) => {
    const profesor = profesoresModel.findById(req.params.id);
    if (profesor) {
        res.status(200).json(profesor);
    } else {
        res.status(404).json({ error: `Profesor con id ${req.params.id} no encontrado` });
    }
};

const getProfesorByMatricula = (req, res) => {
    const profesor = profesoresModel.findByMatricula(req.params.matricula);
    if (profesor) {
        res.status(200).json(profesor);
    } else {
        res.status(404).json({ error: `Profesor con matrícula ${req.params.matricula} no encontrado` });
    }
};

const createProfesor = (req, res) => {
    const { matricula, nombre } = req.body;
    if (!matricula || !nombre) {
        return res.status(400).json({ error: 'Faltan datos para crear el profesor' });
    }
    const nuevoProfesor = profesoresModel.add(req.body);
    res.status(201).json(nuevoProfesor);
};

const updateProfesor = (req, res) => {
    const actualizado = profesoresModel.save(req.params.id, req.body);
    if (actualizado) {
        res.status(200).json(actualizado);
    } else {
        res.status(404).json({ error: `Profesor con id ${req.params.id} no encontrado` });
    }
};

const deleteProfesor = (req, res) => {
    if (profesoresModel.erase(req.params.id)) {
        res.status(200).json({ msg: `Profesor con id ${req.params.id} eliminado exitosamente` });
    } else {
        res.status(404).json({ error: `No se pudo eliminar el profesor con id ${req.params.id}` });
    }
};

const agregarCursoAProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    if (profesoresModel.agregarCurso(profesorId, cursoId)) {
        res.status(200).send(`Curso ${cursoId} agregado al profesor ${profesorId}`);
    } else {
        res.status(400).send('No se pudo agregar el curso al profesor');
    }
};

const eliminarCursoDeProfesor = (req, res) => {
    const { profesorId, cursoId } = req.body;
    if (profesoresModel.eliminarCurso(profesorId, cursoId)) {
        res.status(200).send(`Curso ${cursoId} eliminado del profesor ${profesorId}`);
    } else {
        res.status(400).send('No se pudo eliminar el curso del profesor');
    }
};

const patchProfesor = (req, res) => {
    const id = req.params.id;
    const datosParciales = req.body;

    const profesor = profesoresModel.findById(id);
    if (!profesor) {
        return res.status(404).send('Profesor no encontrado');
    }

    const actualizado = profesoresModel.save(id, datosParciales);
    if (actualizado) {
        res.status(200).send('Profesor modificado');
    } else {
        res.status(400).send('No se pudo modificar el profesor');
    }
};

module.exports = {
    getAllProfesores,
    getProfesor,
    getProfesorByMatricula,
    createProfesor,
    updateProfesor,
    deleteProfesor,
    agregarCursoAProfesor,
    eliminarCursoDeProfesor,
    patchProfesor,
};
