const Laptop = require("../Model/laptop_model");
const User = require("../Model/user_model");  // Assuming the User model exists

// List all laptops
const listLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.status(200).json(laptops);  // Return all laptops as JSON
    } catch (error) {
        console.error("Error fetching laptops:", error);
        res.status(500).json({ error: "Failed to fetch laptops" });
    }
};

// Search and filter laptops by brand and price range
const searchAndFilterLaptops = async (req, res) => {
    try {
        const { brand, priceRange } = req.query;
        const filters = {};
        if (brand) filters.brand = brand;
        if (priceRange) {
            const [min, max] = priceRange.split("-").map(Number);
            filters.price = { $gte: min, $lte: max };
        }

        const laptops = await Laptop.find(filters);
        res.status(200).json(laptops);  // Return filtered laptops as JSON
    } catch (error) {
        console.error("Error searching and filtering laptops:", error);
        res.status(500).json({ error: "Failed to search and filter laptops" });
    }
};

// Get the cart information (example assuming cart is stored in User)
const cartInfo = async (req, res) => {
    try {
        const { userId } = req.query;  // Get userId from query parameters
        const user = await User.findById(userId).populate("cart");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json(user.cart);  // Return cart data of the user
    } catch (error) {
        console.error("Error fetching cart information:", error);
        res.status(500).json({ error: "Failed to fetch cart info" });
    }
};

// Add a laptop to the user's cart
const addToCart = async (req, res) => {
    try {
        const { userId, laptopId, quantity } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        const laptop = await Laptop.findById(laptopId);
        if (!laptop) return res.status(404).json({ error: "Laptop not found" });

        // Add to the user's cart (assuming it's a field in the User model)
        user.cart.push({ laptop: laptopId, quantity });
        await user.save();

        res.status(201).json({ message: "Added to cart", cart: user.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

module.exports = { listLaptops, searchAndFilterLaptops, cartInfo, addToCart };

