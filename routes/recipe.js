// routes/recipe.js

const express = require('express');
const {
    getAllRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    getRecipeIngredients,
    updateRecipeIngredients,
    getRecipeInstructions,
    updateRecipeInstructions,
    getRecipeImage,
    updateRecipeImage,
} = require('../controllers/recipeController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of recipes
 *       500:
 *         description: Internal server error
 */
router.get('/recipe', getAllRecipes);

/**
 * @swagger
 * /recipe/{recipe_id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The recipe object
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.get('/recipe/:recipe_id', getRecipeById);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created recipe object
 *       400:
 *         description: Bad request
 */
router.post('/recipe', addRecipe);

/**
 * @swagger
 * /recipe/{recipe_id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeName:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated recipe object
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Bad request
 */
router.put('/recipe/:recipe_id', updateRecipe);

/**
 * @swagger
 * /recipe/{recipe_id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.delete('/recipe/:recipe_id', deleteRecipe);

/**
 * @swagger
 * /recipe/search:
 *   get:
 *     summary: Search recipes
 *     tags: [Recipes]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: The search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching recipes
 *       500:
 *         description: Internal server error
 */
router.get('/recipe/search', searchRecipes);

/**
 * @swagger
 * /recipe/{recipe_id}/ingredient:
 *   get:
 *     summary: Get ingredients of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of ingredients
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.get('/recipe/:recipe_id/ingredient', getRecipeIngredients);

/**
 * @swagger
 * /recipe/{recipe_id}/ingredient:
 *   put:
 *     summary: Update ingredients of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated ingredients
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Bad request
 */
router.put('/recipe/:recipe_id/ingredient', updateRecipeIngredients);

/**
 * @swagger
 * /recipe/{recipe_id}/instruction:
 *   get:
 *     summary: Get instructions of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The instructions of the recipe
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.get('/recipe/:recipe_id/instruction', getRecipeInstructions);

/**
 * @swagger
 * /recipe/{recipe_id}/instruction:
 *   put:
 *     summary: Update instructions of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated instructions
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Bad request
 */
router.put('/recipe/:recipe_id/instruction', updateRecipeInstructions);

/**
 * @swagger
 * /recipe/{recipe_id}/image:
 *   get:
 *     summary: Get image of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The recipe image
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
router.get('/recipe/:recipe_id/image', getRecipeImage);

/**
 * @swagger
 * /recipe/{recipe_id}/image:
 *   put:
 *     summary: Update image of a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: The ID of the recipe
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated recipe image
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Bad request
 */
router.put('/recipe/:recipe_id/image', updateRecipeImage);

module.exports = router;
