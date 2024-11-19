const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    // productType:
    price: { type: Number, required: true },
    specs: { type: Object, required: true },
    inStock: { type: Boolean, default: true }
    // availableStock: 
    // soldStock: 
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
