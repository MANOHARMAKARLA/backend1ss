// Dependency
const mongoose = require('mongoose');

// Enum for accepted units
const UnitEnum = {
    gm: 'gm',       // Grams
    ml: 'ml',       // Milliliters
    sec: 'sec',     // Seconds
    watt: 'watt',   // Watts
    none: 'none'    // No specific unit
};

// Enum for accepted ingredient types
const IngTypeEnum = {
    additive: 'additive',       // Chemical or natural additives
    alcohol: 'alcohol',         // Alcoholic beverages or ingredients
    beverage: 'beverage',       // Consumable liquids
    cereal: 'cereal',           // Grains
    dairy: 'dairy',             // Milk and milk-based products
    seafood: 'seafood',         // Fish and seafood
    flour: 'flour',             // Powdered or milled grains
    fruit: 'fruit',             // Edible fruits
    fungus: 'fungus',           // Edible fungi
    grain: 'grain',             // Whole or processed grains
    herb: 'herb',               // Fresh herbs
    legume: 'legume',           // Legumes
    leavening_agent: 'leavening_agent', // Leavening agents
    masala: 'masala',           // Spice mixtures
    meat: 'meat',               // Animal-based products
    nut: 'nut',                 // Edible nuts and seeds
    oil: 'oil',                 // Cooking oils
    pasta: 'pasta',             // Prepared pasta products
    paste: 'paste',             // Condensed or pureed foods
    preserve: 'preserve',       // Preserved foods
    sauce: 'sauce',             // Condiments and sauces
    seasoning: 'seasoning',     // Seasonings
    spice: 'spice',             // Ground or whole spices
    spread: 'spread',           // Spreads
    sweetener: 'sweetener',     // Sweetening agents
    vegetable: 'vegetable',     // Edible plants
    water: 'water'              // Water
};

// Enum for allergens
const AllergenEnum = {
    corn: 'corn',               // Corn products
    dairy: 'dairy',             // Milk and milk products
    eggs: 'eggs',               // Egg products
    fish: 'fish',               // Fish
    gluten: 'gluten',           // Wheat, barley, and rye
    mustard: 'mustard',         // Mustard
    peanuts: 'peanuts',         // Peanuts
    sesame: 'sesame',           // Sesame
    soy: 'soy',                 // Soy products
    shellfish: 'shellfish',     // Shellfish
    sulfites: 'sulfites',       // Preservatives
    tree_nuts: 'tree_nuts'     // Tree nuts
};

// Nutritional information schema
const NutritionalInfoSchema = new mongoose.Schema({
    carbohydrates: { type: Number, default: 0.0 },
    protein: { type: Number, default: 0.0 },
    fat: { type: Number, default: 0.0 },
    fiber: { type: Number, default: 0.0 },
    others: { type: Number, default: 0.0 }
});

// Enum for preparation methods
const PrepMethodEnum = {
    boiled: 'boiled',
    chopped: 'chopped',
    chunks: 'chunks',
    crushed: 'crushed',
    diced: 'diced',
    julienne: 'julienne',
    marinated: 'marinated',
    minced: 'minced',
    pureed: 'pureed',
    sliced: 'sliced',
    whole: 'whole'
};

// Preparation schema
const PrepSchema = new mongoose.Schema({
    type: { type: String, enum: Object.values(PrepMethodEnum), required: true },
    image_url: { type: String, required: true }
});

// Ingredient schema
const IngredientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }, // Ingredient name
    type: { type: String, enum: Object.values(IngTypeEnum), required: true }, // Type of ingredient
    unit: { type: [String], enum: Object.values(UnitEnum), required: true }, // Units
    prep_method: { type: [PrepSchema], default: [] }, // Preparation methods
    allergen: { type: [String], enum: Object.values(AllergenEnum) }, // Allergens
    nutrient: { type: NutritionalInfoSchema }, // Nutritional information
    brand: { type: String }, // Brand of the ingredient
    description: { type: String }, // Description of the ingredient
    is_machine_compatible: { type: Boolean, required: true } // Compatibility flag
}, {
    collection: 'ingredients', // MongoDB collection name
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the model
const Ingredient = mongoose.model('Ingredient', IngredientSchema);

// Export the model and enums for use
module.exports = {
    Ingredient,
    UnitEnum,
    IngTypeEnum,
    AllergenEnum,
    PrepMethodEnum
};
