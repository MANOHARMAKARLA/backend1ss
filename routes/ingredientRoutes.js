const express = require('express');
const router = express.Router();
const { createIngredient, getIngredients, getIngredientById, updateIngredient, deleteIngredient } = require('../controllers/ingredientController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - unit
 *         - is_machine_compatible
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the ingredient
 *         type:
 *           type: string
 *           description: Type of the ingredient (e.g., vegetable, spice)
 *         unit:
 *           type: array
 *           items:
 *             type: string
 *           description: Units of measurement for the ingredient
 *         prep_method:
 *           type: array
 *           items:
 *             type: object
 *           description: Preparation methods for the ingredient
 *         allergen:
 *           type: array
 *           items:
 *             type: string
 *           description: List of allergens
 *         nutrient:
 *           type: object
 *           description: Nutritional information
 *         brand:
 *           type: string
 *           description: Brand of the ingredient
 *         description:
 *           type: string
 *           description: Description of the ingredient
 *         is_machine_compatible:
 *           type: boolean
 *           description: Whether the ingredient is compatible with machines
 */

/**
 * @swagger
 * /ingredient:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *       500:
 *         description: Error creating ingredient
 */
router.post('/ingredient', createIngredient);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of all ingredients
 *       500:
 *         description: Error fetching ingredients
 */
router.get('/ingredients', getIngredients);

/**
 * @swagger
 * /ingredient/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ingredient
 *     responses:
 *       200:
 *         description: The ingredient data
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error fetching ingredient
 */
router.get('/ingredient/:id', getIngredientById);

/**
 * @swagger
 * /ingredient/{id}:
 *   put:
 *     summary: Update an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: Ingredient updated successfully
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error updating ingredient
 */
router.put('/ingredient/:id', updateIngredient);

/**
 * @swagger
 * /ingredient/{id}:
 *   delete:
 *     summary: Delete an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ingredient
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Error deleting ingredient
 */
router.delete('/ingredient/:id', deleteIngredient);

module.exports = router;
