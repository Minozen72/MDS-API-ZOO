const Client = require('../models/clientModel');
const User = require('../models/userModel');


exports.getAllClients = async (req, res) => {
    console.log("getAllClients");
        
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);
        res.json(client);
    } catch (error) {
        console.error('Erreur lors de la récupération du client:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.createClient = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, adresse, code_postal, ville, pays } = req.body;
        const generateRandomPassword = () => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';
            for (let i = 0; i < 8; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
        };

        const randomPassword = generateRandomPassword();
        const user = await User.create({ login: email, mdp: randomPassword, role: 'client' });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const client = await Client.create({ nom, prenom, email, telephone, adresse, code_postal, ville, pays, id_utilisateur: user.id_utilisateur });
        res.status(201).json(client);
    } catch (error) {
        console.error('Erreur lors de la création du client:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, adresse, code_postal, ville, pays } = req.body;
        const client = await Client.update({ nom, prenom, email, telephone, adresse, code_postal, ville, pays }, { where: { id_utilisateur: id } });
        res.json(client);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.destroy({ where: { id_utilisateur: id } });
        res.json(client);
    } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};



