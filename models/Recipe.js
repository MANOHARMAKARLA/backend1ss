// models/Recipe.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeId: {
        type: Number,
        unique: true,
        required: true,
    },
    recipeName: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    comments: [{
        user: String,
        comment: String,
    }],
    totalDownloads: {
        type: Number,
        default: 0,
    },
    totalCookingTimes: {
        type: Number,
        default: 0,
    },
    totalCookingTime: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
