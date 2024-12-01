const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    specifications: { type: String, required: true },
    stock: { type: Number, required: true },
});

const Laptop = mongoose.model("Laptop", laptopSchema);
module.exports = Laptop;
