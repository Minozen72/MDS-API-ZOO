const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour afficher tous les utilisateurs
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
