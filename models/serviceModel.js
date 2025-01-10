const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
    id_service: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    nb_personne: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date_service: {
        type: DataTypes.DATE,
        allowNull: true
    },
    duree: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    adresse: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Service',
    schema: 'B2C',
    timestamps: false
  });

module.exports = Service;



