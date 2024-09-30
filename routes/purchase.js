// routes/purchase.js

const express = require('express');
const { purchaseCart } = require('../controllers/purchaseController');

const router = express.Router();

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Purchase items in the cart
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the purchase.
 *                 example: "605c72e3a0c1d15b6cd5a3b9"
 *     responses:
 *       200:
 *         description: Purchase successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Purchase successful"
 *                 purchasedRecipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       recipeId:
 *                         type: string
 *                         example: "60f84c722f1e2c0018f9a1e0"
 *       400:
 *         description: Bad Request (e.g., cart is empty or user ID is missing)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart is empty" 
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/purchase', purchaseCart);

module.exports = router;
