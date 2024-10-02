const mongoose = require('mongoose');
const { Schema } = mongoose;
const UnitEnum = {
    gm: 'gm',       // Grams
    ml: 'ml',       // Milliliters
    sec: 'sec',     // Seconds
    watt: 'watt',   // Watts
    none: 'none'    // No specific unit
};
// Enum-like values for cuisines, categories, and diet types
const CuisineEnum = {
    AMERICAN: "american",
    CHINESE: "chinese",
    INDIAN: "indian",
    ITALIAN: "italian",
    MEXICAN: "mexican",
    THAI: "thai",
    OTHER: "other"
};

const CategoryEnum = {
    APPETIZER: "appetizer",
    BEVERAGE: "beverage",
    BREAKFAST_BRUNCH: "breakfast_brunch",
    DESSERT: "dessert",
    MAIN_COURSE: "main_course",
    SALAD: "salad",
    SIDE_DISH: "side_dish",
    SNACK: "snack",
    SOUP: "soup"
};

const DietTypeEnum = {
    VEGETARIAN: "vegetarian",
    NON_VEGETARIAN: "non_vegetarian",
    VEGAN: "vegan",
    OTHER: "other"
};
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
// Slot Schema
const SlotSchema = new Schema({
    oil_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    water_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    seasoning_id: { type: [mongoose.Schema.Types.ObjectId], ref: 'Ingredient', validate: {
        validator: function(v) {
            return v.length <= 8;
        },
        message: props => `${props.value.length} is more than the limit of 8 seasoning IDs!`
    }}
});

// Serving Schema
const ServingSchema = new Schema({
    ing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    value: { type: [Number], default: [0, 0, 0, 0], validate: {
        validator: function(v) {
            return v.length === 4;
        },
        message: props => `${props.value.length} is not equal to 4!`
    }},
    unit: { type: String, enum: Object.values(UnitEnum), required: true }, // Assuming UnitEnum is defined elsewhere
    prep_method: { type: String, enum: Object.values(PrepMethodEnum), default: "whole" } // Assuming PrepMethodEnum is defined elsewhere
});

// Instruction Schema
const InstructionSchema = new Schema({
    cmd: { type: String, required: true, validate: {
        validator: function(v) {
            return Object.values(CommandEnum).includes(v) || v.startsWith("DROP_");
        },
        message: props => `${props.value} is not a valid command!`
    }},
    value: { type: [Number], default: Array(12).fill(0), validate: {
        validator: function(v) {
            return v.length === 12;
        },
        message: props => `${props.value.length} is not equal to 12!`
    }},
    unit: { type: String, enum: Object.values(UnitEnum), required: true }, // Assuming UnitEnum is defined elsewhere
    text: { type: String }
});

// Recipe Schema
const RecipeSchema = new Schema({
    name: { type: String, unique: true, required: true },
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
    cuisine: { type: String, enum: Object.values(CuisineEnum), required: true },
    category: { type: String, enum: Object.values(CategoryEnum), required: true },
    diet_type: { type: String, enum: Object.values(DietTypeEnum), required: true },
    pre_prep_time: { type: Number },
    source_of_chef: { type: String },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    editor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_on: { type: Date, default: Date.now },
    updated_on: { type: Date },
    slots: SlotSchema,
    containers: {
        container1: { type: [ServingSchema] },
        container2: { type: [ServingSchema] },
        container3: { type: [ServingSchema] },
        container4: { type: [ServingSchema] },
        container5: { type: [ServingSchema] },
        container6: { type: [ServingSchema] },
    },
    instructions: { type: [InstructionSchema] }
});

// Create the Recipe model
const Recipe = mongoose.model('Recipe', RecipeSchema);

// Export the model
module.exports = Recipe;
