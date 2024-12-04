const { Sequelize } = require('sequelize');

// Configuración de la conexión
const sequelize = new Sequelize('Escuela', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

// Verificar la conexión
sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a la base de datos.'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
