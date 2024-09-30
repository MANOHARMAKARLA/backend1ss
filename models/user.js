// models/User.js

// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String },
        gender: { type: String },
        country: { type: String },
        state: { type: String },
        dietaryPreference: { type: String, enum: ['Veg', 'Non-Veg'] },
        cookingSkills: { type: String },
        cuisine: { type: String },
        spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Spicy'] },
        favoriteRecipes: [{ type: String }],
        allergic: { type: String },
        diagnosedWith: { type: String },
    },
    cart: [{
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
        
    }],
    purchasedRecipes: [{
        recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
        purchaseDate: { type: Date, default: Date.now },
    }],
    otps: [{ otp: String, deviceId: String, expiry: Date }],
    verified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    deviceId: { type: String },
    refreshToken: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;

