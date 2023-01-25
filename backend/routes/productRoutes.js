const Product = require("../models/Products");
const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    let { name, hsn, rate, tax, group } = req.body;
    await new Product({ name, hsn, rate, tax, group }).save();
    return res.status(200).json({ message: "Product Creation Successful" });
  } catch (error) {
    handleError("Product Creation Error", __filename, error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/view", async (req, res) => {
  let allProducts = await Product.find({});
  res.status(200).json({ data: allProducts });
});

module.exports = router;
