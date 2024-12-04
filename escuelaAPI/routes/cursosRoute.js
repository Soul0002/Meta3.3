const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosdb');

// Rutas para cursos
router.get('/cursos', cursosController.getCursos);
router.get('/cursos/:id', cursosController.getCursoById);
router.post('/cursos', cursosController.createCurso);
router.put('/cursos/:id', cursosController.updateCurso);
router.patch('/cursos/:id', cursosController.patchCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);

// Rutas para gestionar estudiantes en cursos
router.post('/cursos/inscribirEstudiante', cursosController.inscribirEstudiante);
router.post('/cursos/eliminarEstudiante', cursosController.eliminarEstudiante);

// Rutas para gestionar profesores en cursos
router.post('/cursos/asignarProfesor', cursosController.asignarProfesor);
router.post('/cursos/eliminarProfesorDeCurso', cursosController.eliminarProfesorDeCurso);

// Rutas relacionadas con estudiantes y profesores
router.get('/estudiantes/:estudianteId/cursos', cursosController.getCursosDeEstudiante);
router.get('/estudiantes/:estudianteId/profesores', cursosController.getProfesoresDeEstudiante);
router.get('/profesores/:profesorId/cursos', cursosController.getCursosDeProfesor);
router.get('/profesores/:profesorId/estudiantes', cursosController.getEstudiantesDeProfesor);

module.exports = router;
