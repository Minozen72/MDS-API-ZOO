const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes pour voir tous les produits
router.get('/', authMiddleware, stockController.getAllStocks);

// Routes pour voir un produit
router.get('/:id_stock', authMiddleware, stockController.getStockById);

// Routes pour créer un produit
router.post('/', authMiddleware, stockController.createStock);

// Routes pour mettre à jour un produit
router.put('/:id_stock', authMiddleware, stockController.updateStock);

// Routes pour supprimer un produit
router.delete('/:id_stock', authMiddleware, stockController.deleteStock);

module.exports = router;