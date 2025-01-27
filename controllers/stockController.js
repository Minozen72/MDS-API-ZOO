const Stock = require('../models/stockModel');
const io = require('socket.io');




exports.getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.findAll();
        res.json(stocks);
    } catch (error) {
        console.error('Erreur lors de la récupération des stocks:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.getStockById = async (req, res) => {
    try {
        const { id_stock } = req.params;
        const stock = await Stock.findByPk(id_stock);
        res.json(stock);
    } catch (error) {
        console.error('Erreur lors de la récupération du stock:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.createStock = async (req, res) => {
    try {
        const { quantite, date_mise_a_jour, emplacement, is_deleted } = req.body;
        const stock = await Stock.create({ quantite, date_mise_a_jour, emplacement, is_deleted });
        res.status(201).json(stock);
    } catch (error) {
        console.error('Erreur lors de la création du stock:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { id_stock } = req.params;
        const { quantite, date_mise_a_jour, emplacement, is_deleted } = req.body;
        const stock = await Stock.update({ quantite, date_mise_a_jour, emplacement, is_deleted }, { where: { id_stock } });
        res.json(stock);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du stock:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        const { id_stock } = req.params;
        const stock = await Stock.destroy({ where: { id_stock } });
        res.json(stock);
    } catch (error) {
        console.error('Erreur lors de la suppression du stock:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};
