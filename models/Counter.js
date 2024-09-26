// models/Counter.js

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    sequenceValue: {
        type: Number,
        default: 0,
    },
}, { collection: 'counters' });

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
