const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Stock = sequelize.define('Stock', {
  id_stock: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_mise_a_jour: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  emplacement: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'Stock',
  schema: 'B2B',
  timestamps: false
});

module.exports = Stock;
