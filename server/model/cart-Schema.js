const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'USER', required: true },
    items: [
        {
            laptopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
