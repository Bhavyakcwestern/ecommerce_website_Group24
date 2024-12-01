// Import necessary models
const Laptop = require("../Model/laptop_model"); // Adjust path as necessary
const User = require("../Model/user_model"); // Adjust path as necessary

// List laptops (Example)
const listLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find(); // Fetch all laptops
        res.status(200).json(laptops);
    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ message: "Failed to retrieve laptops" });
    }
};

// Search and filters (Example)
const searchAndFilters = async (req, res) => {
    const { query } = req.query;
    try {
        const laptops = await Laptop.find({ name: { $regex: query, $options: "i" } });
        res.status(200).json(laptops);
    } catch (error) {
        console.error("Error with search and filters:", error);
        res.status(500).json({ message: "Failed to apply filters" });
    }
};

// Add to cart (Example)
const addToCart = async (req, res) => {
    try {
        const { userId, laptopId, quantity } = req.body;
        if (!userId || !laptopId || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = { laptopId, quantity };
        user.cart.push(cartItem);
        await user.save();

        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Failed to add to cart" });
    }
};

// Get cart info (Example)
const cartInfo = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId).populate('cart.laptopId'); // Assuming cart has laptopId that needs population
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        console.error("Error fetching cart info:", error);
        res.status(500).json({ message: "Failed to retrieve cart information" });
    }
};

module.exports = {
    listLaptops,
    searchAndFilters,
    addToCart,
    cartInfo
};
