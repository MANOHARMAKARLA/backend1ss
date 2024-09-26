// routes/purchase.js

const express = require('express');
const { purchaseCart } = require('../controllers/purchaseController');

const router = express.Router();

// Route for purchasing items in the cart
router.post('/purchase', purchaseCart);

module.exports = router;
