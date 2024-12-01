require('dotenv').config();  // Make sure the environment variables are loaded

const express = require("express");
const app = express();

const router = require("./router/auth-router");
const laptopRouter = require("./router/laptop-router");  // Add the new router for laptop APIs
const connectDB = require("./utlis/db");

// Middleware
app.use(express.json());  // Body parser to handle JSON requests
// app.use(ur middleware function)

// Register Routes
app.use("/api/auth", router);  // Auth-related routes
app.use("/api/laptops", laptopRouter);  // Laptop-related routes

// Start the server after connecting to the database
connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Server is running at port: 5000");
    });
});
