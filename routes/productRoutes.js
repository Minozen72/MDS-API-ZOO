const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes pour voir tous les produits
router.get('/', authMiddleware, productController.getAllProducts);

// Routes pour voir un produit
router.get('/:id_produit', authMiddleware, productController.getProductById);

// Routes pour créer un produit
router.post('/', authMiddleware, productController.createProduct);

// Routes pour mettre à jour un produit
router.put('/:id_produit', authMiddleware, productController.updateProduct);

// Routes pour supprimer un produit
router.delete('/:id_produit', authMiddleware, productController.deleteProduct);

module.exports = router;