const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Client = sequelize.define('Client', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'id_utilisateur'
        }
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    code_postal: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    ville: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pays: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: 'Client',
    schema: 'B2C',
    timestamps: false
});

Client.belongsTo(User, { foreignKey: 'id_utilisateur', targetKey: 'id_utilisateur' });

module.exports = Client;