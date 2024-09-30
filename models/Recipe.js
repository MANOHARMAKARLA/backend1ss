const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeId: {
        type: Number,
        unique: true,
        required: true,
        min: 1,
    },
    recipeName: {
        type: String,
        required: true,
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String, // e.g., "2 cups", "1 tsp", etc.
            required: true,
        },
        measurementUnit: {
            type: String, // e.g., "ml", "g", "cups", etc.
            required: false, // Optional field
        },
    }],
    spcies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Reference to the Item model
        required: true,
    }],
    instructions: {
        type: String,
        required: true,
    },
    simmerInstructions: {
        type: String,
        required: true,
    },
    momeInstructions: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        default: null,
        min: 0,
        max: 5,
    },
    comments: [{
        user: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
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
    imageUrl: {
        type: String, // URL or path to the image
        required: false,
        validate: {
            validator: function(v) {
                // Simple regex to validate URL
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    author: {
        type: String,
        required: true,
    },
    vegNonVeg: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true,
    },
    cuisine: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    servingSize: {
        type: Number,
        default: 1,
        min: 1,
    },
    preparationTime: {
        type: Number,
        required: true,
        min: 0,
    },
    recipeOrigin: {
        type: String,
        required: false,
    },
    sourceOfChef: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
