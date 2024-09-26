const Item = require('../models/item');

// Create a new item (Seasoning or Ingredient)
const createItem = async (req, res) => {
    try {
        const { name, description, type, imageUrl } = req.body;

        const newItem = new Item({
            name,
            description,
            type,
            imageUrl
        });

        await newItem.save();

        res.status(201).json({ message: 'Item created successfully', item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating item' });
    }
};

// Get all items (Seasonings and Ingredients)
const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching items' });
    }
};

// Get a single item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching item' });
    }
};

// Update an item (Seasoning or Ingredient)
const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating item' });
    }
};

// Delete an item (Seasoning or Ingredient)
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting item' });
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
