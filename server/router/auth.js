const express = require('express');
const Laptop = require('../model/laptopSchema'); // Import Laptop schema
const Cart = require('../model/cartSchema'); // Import Cart schema
const router = express.Router();

// 1. List all laptops
router.get('/list-laptops', async (req, res) => {
    try {
        const laptops = await Laptop.find({});
        res.json(laptops);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch laptops" });
    }
});

// 2. Search laptops with filters
router.get('/search-and-filters', async (req, res) => {
    try {
        const { brand, minPrice, maxPrice } = req.query;
        const filter = {};

        if (brand) filter.brand = brand;
        if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

        const laptops = await Laptop.find(filter);
        res.json(laptops);
    } catch (err) {
        res.status(500).json({ error: "Failed to apply filters" });
    }
});

// 3. View cart info
router.get('/cart-info', async (req, res) => {
    try {
        const userId = req.userId; // Replace with proper user authentication
        const cart = await Cart.findOne({ userId }).populate('items.laptopId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
});

// 4. Add item to cart
router.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, laptopId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        const itemIndex = cart.items.findIndex((item) => item.laptopId.toString() === laptopId);

        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ laptopId, quantity });
        }

        cart.total = cart.items.reduce((sum, item) => sum + item.quantity * item.laptopId.price, 0);

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});

module.exports = router;
