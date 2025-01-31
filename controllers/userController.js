const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secretKey = '1234567890';

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id_utilisateur } = req.params;
    const user = await User.findByPk(id_utilisateur);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { login, mdp, role } = req.body;
    const user = await User.create({ login, mdp, role });
    res.status(201).json(user);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

// Récupérer un utilisateur par son id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {

    const { id_utilisateur, login, mdp, role } = req.body;
    const [updated] = await User.update({ login, mdp, role }, {
      where: { id_utilisateur: id_utilisateur }
    });
    if (updated) {
      const updatedUser = await User.findByPk(id_utilisateur);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  console.log("deleteUser");
  try {
    const { id } = req.params;
    console.log("id : ", id);
    const deleted = await User.destroy({
      where: { id_utilisateur: id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    if (password !== user.mdp) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ userId: user.id_utilisateur }, secretKey, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};
