const { Ingredient } = require('../models/ingredient');

// Create a new ingredient
const createIngredient = async (req, res) => {
    try {
        const { name, type, unit, prep_method, allergen, nutrient, brand, description, is_machine_compatible } = req.body;

        // Check if ingredient already exists
        const existingIngredient = await Ingredient.findOne({ name });
        if (existingIngredient) {
            return res.status(400).json({ message: 'Ingredient already exists' });
        }

        // Create a new ingredient
        const newIngredient = new Ingredient({
            name,
            type,
            unit,
            prep_method,
            allergen,
            nutrient,
            brand,
            description,
            is_machine_compatible
        });

        // Save ingredient to the database
        await newIngredient.save();
        res.status(201).json({ message: 'Ingredient created successfully', ingredient: newIngredient });
    } catch (error) {
        console.error('Error creating ingredient:', error);
        res.status(500).json({ message: 'Error creating ingredient', error: error.message });
    }
};

// Get all ingredients
const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        res.status(200).json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ message: 'Error fetching ingredients' });
    }
};

// Get an ingredient by ID
const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        console.error('Error fetching ingredient:', error);
        res.status(500).json({ message: 'Error fetching ingredient' });
    }
};

// Update an ingredient by ID
const updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json({ message: 'Ingredient updated successfully', ingredient: updatedIngredient });
    } catch (error) {
        console.error('Error updating ingredient:', error);
        res.status(500).json({ message: 'Error updating ingredient' });
    }
};

// Delete an ingredient by ID
const deleteIngredient = async (req, res) => {
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);

        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ message: 'Error deleting ingredient' });
    }
};

module.exports = {
    createIngredient,
    getIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient
};
