const Estudiante = require('../models/estudiantesdb');
const Curso = require('../models/cursosdb');
const Profesor = require('../models/profesoresdb');
const sequelize = require('../config/db');

// Relación Estudiantes ↔ Cursos
Estudiante.belongsToMany(Curso, { through: 'EstudianteCurso' });
Curso.belongsToMany(Estudiante, { through: 'EstudianteCurso' });

// Relación Profesores ↔ Cursos
Profesor.belongsToMany(Curso, { through: 'ProfesorCurso' });
Curso.belongsToMany(Profesor, { through: 'ProfesorCurso' });

// Sincronizar los modelos
sequelize.sync({ force: true })
    .then(() => console.log('Base de datos sincronizada.'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

module.exports = { Estudiante, Curso, Profesor };
