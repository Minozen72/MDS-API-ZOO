const Service = require('../models/serviceModel');

exports.getAllServices = async (req, res) => {
    try {
        console.log("getAllServices");
        const services = await Service.findAll();
        console.log("services",services);
        res.json(services);
    } catch (error) {
        console.error('Erreur lors de la récupération des services:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const { id_service } = req.params;
        const service = await Service.findByPk(id_service);
        res.json(service);
    } catch (error) {
        console.error('Erreur lors de la récupération du service:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.createService = async (req, res) => {
    try {
        const { description, nb_personne, date_service, duree, adresse, prix } = req.body;
        const service = await Service.create({ description, nb_personne, date_service, duree, adresse, prix });
        res.status(201).json(service);
    } catch (error) {
        console.error('Erreur lors de la création du service:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id_service } = req.params;
        const { nom, description, prix } = req.body;
        const service = await Service.update({ nom, description, prix }, { where: { id_service } });
        res.json(service);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du service:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id_service } = req.params;
        await Service.destroy({ where: { id_service } });
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression du service:', error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
};

