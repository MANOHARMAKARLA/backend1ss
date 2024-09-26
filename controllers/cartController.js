// controllers/cartController.js

const User = require('../models/User'); // Import the User model
const Recipe = require('../models/Recipe'); // Import the Recipe model

// Add a recipe to the cart
const addToCart = async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the recipe is already in the cart
        if (user.cart.some(item => item.recipeId.toString() === recipeId)) {
            return res.status(400).json({ message: 'Recipe already in cart' });
        }

        // Add new recipe to the cart
        user.cart.push({ recipeId });
        await user.save();
        
        return res.status(200).json(user.cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Retrieve user's cart
const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cart.recipeId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user.cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Remove a recipe from the cart
const removeFromCart = async (req, res) => {
    const { userId, recipeId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter out the recipeId to remove it from the cart
        user.cart = user.cart.filter(item => item.recipeId.toString() !== recipeId);
        await user.save();
        
        return res.status(200).json(user.cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
};
