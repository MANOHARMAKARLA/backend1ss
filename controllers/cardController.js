// cardController.js
const Card = require('../models/Card');

// Create a new card (Admin only)
const createCard = async (req, res) => {
    try {
        const { title, description, imageUrl, allowAll, specificCollege, excludeCollege, order } = req.body;

        const newCard = new Card({
            title,
            description,
            imageUrl,
            allowAll,
            specificCollege,
            excludeCollege,
            order,
        });

        await newCard.save();

        res.status(201).json({ message: 'Card created successfully', card: newCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating card' });
    }
};

// Get all cards (Accessible to all users)
const getCards = async (req, res) => {
    try {
        const cards = await Card.find({});
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cards' });
    }
};

// Get a single card by ID (Accessible to all users)
const getCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching card' });
    }
};

// Update a card (Admin only)
const updateCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({ message: 'Card updated successfully', card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating card' });
    }
};

// Delete a card (Admin only)
const deleteCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting card' });
    }
};

module.exports = {
    createCard,
    getCards,
    getCardById,
    updateCard,
    deleteCard,
};
