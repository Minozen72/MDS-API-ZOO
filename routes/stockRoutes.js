const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: API endpoints for managing stocks
 */

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     tags: [Stocks]   
 *     summary: Retrieve all stocks
 *     description: Get a list of all stocks.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of stocks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stock'
 */
router.get('/', authMiddleware, stockController.getAllStocks);

/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     tags: [Stocks]
 *     summary: Retrieve a specific stock by ID
 *     description: Get details of a specific stock by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of a stock.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 */
router.get('/:id_stock', authMiddleware, stockController.getStockById);

/**
 * @swagger
 * /api/stocks:
 *   post:
 *     tags: [Stocks]
 *     summary: Create a stock
 *     description: Create a new stock with provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Stock created successfully.
 */
router.post('/', authMiddleware, stockController.createStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     tags: [Stocks]
 *     summary: Update a stock
 *     description: Update details of an existing stock.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       200:
 *         description: Stock updated successfully.
 */
router.put('/:id_stock', authMiddleware, stockController.updateStock);

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     tags: [Stocks]
 *     summary: Delete a stock
 *     description: Delete a stock by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stock deleted successfully.
 */
router.delete('/:id_stock', authMiddleware, stockController.deleteStock);

module.exports = router;