// controllers/purchaseController.js

const User = require('../models/user');
const Recipe = require('../models/Recipe');

// Purchase items in the cart
const purchaseCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId).populate('cart.recipeId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Process each recipe purchase
        user.cart.forEach(item => {
            // Push the purchased recipe to purchasedRecipes array
            user.purchasedRecipes.push({ recipeId: item.recipeId._id });
        });

        // Clear the cart after purchase
        user.cart = [];
        await user.save();

        return res.status(200).json({ message: 'Purchase successful', purchasedRecipes: user.purchasedRecipes });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    purchaseCart,
};
