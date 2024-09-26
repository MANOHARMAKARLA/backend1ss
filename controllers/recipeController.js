// controllers/recipeController.js

const Recipe = require('../models/Recipe');

// Get All Recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Recipe by ID
const getRecipeById = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const recipe = await Recipe.findById(recipe_id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(recipe);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Add Recipe
const addRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body);
    try {
        const savedRecipe = await newRecipe.save();
        return res.status(200).json(savedRecipe);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Update Recipe
const updateRecipe = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, req.body, { new: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(updatedRecipe);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Delete Recipe
const deleteRecipe = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipe_id);
        if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(204).send(); // No Content
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Search Recipes
const searchRecipes = async (req, res) => {
    const { query } = req.query;
    try {
        const recipes = await Recipe.find({
            $or: [
                { recipeName: { $regex: query, $options: 'i' } },
                { ingredients: { $regex: query, $options: 'i' } },
            ],
        });
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Recipe Ingredients
const getRecipeIngredients = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const recipe = await Recipe.findById(recipe_id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(recipe.ingredients);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update Recipe Ingredients
const updateRecipeIngredients = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, { ingredients: req.body.ingredients }, { new: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(updatedRecipe.ingredients);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get Recipe Instructions
const getRecipeInstructions = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const recipe = await Recipe.findById(recipe_id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(recipe.instructions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update Recipe Instructions
const updateRecipeInstructions = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, { instructions: req.body.instructions }, { new: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json(updatedRecipe.instructions);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get Recipe Image
const getRecipeImage = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const recipe = await Recipe.findById(recipe_id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json({ image: recipe.image }); // Adjust based on your actual field for image
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update Recipe Image
const updateRecipeImage = async (req, res) => {
    const { recipe_id } = req.params;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipe_id, { image: req.body.image }, { new: true });
        if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
        return res.status(200).json({ image: updatedRecipe.image });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
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
};
