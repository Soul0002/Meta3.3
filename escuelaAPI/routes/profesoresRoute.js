const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresdb');

// Rutas para profesores
router.get('/profesores', profesoresController.getProfesores);
router.get('/profesores/:id', profesoresController.getProfesorById);
router.post('/profesores', profesoresController.createProfesor);
router.put('/profesores/:id', profesoresController.updateProfesor);
router.patch('/profesores/:id', profesoresController.patchProfesor);
router.delete('/profesores/:id', profesoresController.deleteProfesor);

// Rutas para gestionar cursos de profesores
router.post('/profesores/agregar-curso', profesoresController.agregarCursoAProfesor);
router.post('/profesores/eliminar-curso', profesoresController.eliminarCursoDeProfesor);

module.exports = router;
