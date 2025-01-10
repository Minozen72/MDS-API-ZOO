const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zoo', 'toto', 'toto', {
  host: 'localhost',
  dialect: 'mssql',
  port:1433,
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
