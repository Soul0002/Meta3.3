const { Curso, Estudiante, Profesor } = require('../escuelaAPI/models/relaciones');
const sequelize = require('../escuelaAPI/config/db');

async function main() {
    try {
        console.log('Conexión a la base de datos establecida con éxito.');
        
        await sequelize.sync({ force: true });

        // Crear datos
        const curso1 = await Curso.create({ nombre: 'Desarrollo de aplicacciones web', creditos: 4 });
        const curso2 = await Curso.create({ nombre: 'Gestión y seguridad en redes', creditos: 3 });

        const estudiante1 = await Estudiante.create({ nombre: 'Hugo Cazarez', matricula: '01162076', semestre: '2024-2', creditos: 30 });
        const estudiante2 = await Estudiante.create({ nombre: 'Ericka Vea', matricula: '01163058', semestre: '2024-1', creditos: 25 });

        const profesor1 = await Profesor.create({ nombre: 'Martín Olguín', matricula: '12345' });
        const profesor2 = await Profesor.create({ nombre: 'Iván Anguiano', matricula: '54321' });

        // Asociaciones
        await curso1.addEstudiantes([estudiante1, estudiante2]);
        await curso2.addEstudiante(estudiante1);

        await curso1.addProfesor(profesor1);
        await curso2.addProfesor(profesor2);

        // Consultar cursos de un estudiante
        const cursosDeEstudiante1 = await estudiante1.getCursos();
        console.log(`Cursos de ${estudiante1.nombre}:`, cursosDeEstudiante1.map(curso => curso.nombre));

        // Consultar estudiantes de un curso
        const estudiantesDeCurso1 = await curso1.getEstudiantes();
        console.log(`Alumnos en el curso ${curso1.nombre}:`, estudiantesDeCurso1.map(estudiante => estudiante.nombre));

        // Consultar cursos de un profesor
        const cursosDeProfesor1 = await profesor1.getCursos();
        console.log(`Cursos del profesor ${profesor1.nombre}:`, cursosDeProfesor1.map(curso => curso.nombre));
    } catch (error) {
        console.error('Error en las consultas:', error);
    } finally {
        await sequelize.close();
    }
}

main();
