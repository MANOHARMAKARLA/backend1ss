const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['seasoning', 'ingredient','Oil'],  // Restricts the values to 'seasoning' or 'ingredient'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to automatically update the `updatedAt` field before saving
itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
