const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route pour afficher tous les utilisateurs
router.get('/', authMiddleware, userController.getAllUsers);

// Route pour afficher un utilisateur
router.get('/:id_utilisateur', authMiddleware, userController.getUser);

// Route pour créer un utilisateur
router.get('/login', userController.login);

// Route pour créer un utilisateur
router.post('/create', authMiddleware, userController.createUser);

// Route pour mettre à jour un utilisateur
router.put('/update', authMiddleware, userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/delete', authMiddleware, userController.deleteUser);







module.exports = router;

