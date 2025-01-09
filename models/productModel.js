const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  taille: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  poids: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  couleur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  materiau: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
  
});


module.exports = Product;