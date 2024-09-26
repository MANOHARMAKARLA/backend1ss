const express = require('express');
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
} = require('../controllers/itemController');

const router = express.Router();

// POST /item - Create a new item
router.post('/item', createItem);

// GET /item - Get all items
router.get('/item', getItems);

// GET /item/:id - Get a specific item by ID
router.get('/item/:id', getItemById);

// PUT /item/:id - Update a specific item by ID
router.put('/item/:id', updateItem);

// DELETE /item/:id - Delete a specific item by ID
router.delete('/item/:id', deleteItem);

module.exports = router;
