const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Stock = require('./stockModel');

const Product = sequelize.define('Product', {
  id_produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
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
    type: DataTypes.STRING(50),
    allowNull: true
  },
  poids: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  couleur: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  matiere: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  id_stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Stock',
      key: 'id_stock'
    }
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'Produit',
  schema: 'B2B',
  timestamps: false
});

Product.belongsTo(Stock, { foreignKey: 'id_stock' });

module.exports = Product;