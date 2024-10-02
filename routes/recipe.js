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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The created recipe object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The updated recipe object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     cmd:
 *                       type: string
 *                     value:
 *                       type: array
 *                       items:
 *                         type: number
 *                     unit:
 *                       type: string
 *                     text:
 *                       type: string
 *     responses:
 *       200:
 *         description: The updated instructions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
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
 *                 format: binary
 *     responses:
 *       200:
 *         description: The updated image
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Bad request
 */
router.put('/recipe/:recipe_id/image', updateRecipeImage);

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - recipe_id
 *         - recipe_name
 *         - description
 *         - time
 *         - cuisine_type
 *         - allergens
 *         - cost
 *       properties:
 *         recipe_id:
 *           type: string
 *           description: The recipe ID
 *         recipe_name:
 *           type: string
 *           description: The name of the recipe
 *         description:
 *           type: string
 *           description: A description of the recipe
 *         time:
 *           type: number
 *           description: The preparation time in minutes
 *         cuisine_type:
 *           type: string
 *           description: The type of cuisine
 *         allergens:
 *           type: array
 *           items:
 *             type: string
 *           description: Any allergens present in the recipe
 *         cost:
 *           type: number
 *           description: The cost of the recipe
 *         image:
 *           type: string
 *           format: binary
 *           description: The image of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients
 *         instructions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *               value:
 *                 type: array
 *                 items:
 *                   type: number
 *               unit:
 *                 type: string
 *               text:
 *                 type: string
 *           description: List of instructions
 */

module.exports = router;
