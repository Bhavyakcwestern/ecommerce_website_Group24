const Product = require("../../model/productModel");

const listProducts = async (req, res) => {
  const {
    search,
    type, // 0 for Laptop, 1 for Accessories
    category, // Applicable for both laptops and accessories
    screen_size, // Laptops only
    os, // Laptops only
    gpu, // Laptops only
    storage, // Laptops only
    sortby, // e.g., price, releaseDate, rating
    order = "asc", // Default sort order
  } = req.query;

  try {
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (type !== undefined) {
      query.type = Number(type);
    }

    if (category) {
    }

    if (screen_size) {
      query["spec.screensize"] = screen_size;
    }

    if (os) {
      query["spec.os"] = { $regex: os, $options: "i" };
    }

    if (gpu) {
      query["spec.gpu"] = { $regex: gpu, $options: "i" };
    }

    if (storage) {
      query["spec.storage"] = { $regex: storage, $options: "i" };
    }

    const sort = {};
    if (sortby) {
      const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
      sort[sortby] = sortOrder;
    }
    console.log("query is ", query, sort)
    const products = await Product.find(query).sort(sort);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  listProducts,
};
