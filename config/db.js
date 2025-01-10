const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  port: process.env.DB_PORT,
  dialectOptions: {
    encrypt: true,
    trustServerCertificate: true
  }
});

sequelize.sync().then(() => {
    console.log('✅ Base de données synchronisée');
}).catch(err => {
    console.error('❌ Erreur lors de la synchronisation de la base de données :', err);
});

module.exports = sequelize;
