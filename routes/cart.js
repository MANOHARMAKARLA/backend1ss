const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - itemId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               itemId:
 *                 type: string
 *                 description: ID of the item to add
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the item
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Invalid request data
 */
router.post('/add', addToCart);

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get the cart of a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of items in the user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   itemId:
 *                     type: string
 *                     description: ID of the item in the cart
 *                   // quantity removed as per your request
 */
router.get('/:userId', getCart);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - itemId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               itemId:
 *                 type: string
 *                 description: ID of the item to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Invalid request data
 */
router.delete('/remove', removeFromCart);

module.exports = router;
