const Product = require('../models/productModel');
const io = require('socket.io');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id_produit } = req.params;
        const product = await Product.findByPk(id_produit);
        res.json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nom, description, type, prix, taille, poids, couleur, matiere, id_stock } = req.body;
        console.log(nom, description, type, prix, taille, poids, couleur, matiere, id_stock);
        const product = await Product.create({ nom, description, type, prix : parseFloat(prix), taille, poids : parseFloat(poids) , couleur, matiere, id_stock: parseInt(id_stock) });
        io.emit('productCreated', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id_produit } = req.params;
        const { nom, description, prix, taille, poids, couleur, matiere, id_stock } = req.body;
        const product = await Product.update({ nom, description, prix, taille, poids, couleur, matiere, id_stock }, { where: { id_produit } });
        console.log(product);
        res.json(product);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id_produit } = req.params;
        const product = await Product.destroy({ where: { id_produit } });
        res.json(product);
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};
