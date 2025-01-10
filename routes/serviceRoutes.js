const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, serviceController.getAllServices);

router.get('/:id_service', authMiddleware, serviceController.getServiceById);

router.post('/', authMiddleware, serviceController.createService);

router.put('/:id_service', authMiddleware, serviceController.updateService);

router.delete('/:id_service', authMiddleware, serviceController.deleteService);

module.exports = router;