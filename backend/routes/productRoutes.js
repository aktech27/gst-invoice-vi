const Product = require("../models/Products");
const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    let { name, hsn, rate, tax, group } = req.body;
    let newProduct = await new Product({ name, hsn, rate, tax, group }).save();
    return res.status(200).json({ message: "Product Creation Successful", newProduct });
  } catch (error) {
    handleError("Product Creation Error", __filename, error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/groups", async (req, res) => {
  let groupsArray = await Product.distinct("group");
  return res.status(200).json(groupsArray);
});

router.get("/view", async (req, res) => {
  let { currentPage, maxPerPage } = req.query;
  currentPage = parseInt(currentPage) || 1;
  maxPerPage = parseInt(maxPerPage) || 10;

  let totalProducts = await Product.count();
  let maxPagesPossible = Math.ceil(totalProducts / maxPerPage);

  if (currentPage > maxPagesPossible || currentPage < 1)
    return res.status(422).json({ error: "Invalid Page number" });

  let allProducts = await Product.find({})
    .sort({ name: "asc" })
    .limit(maxPerPage)
    .skip((currentPage - 1) * maxPerPage);
  res.status(200).json({ data: allProducts, maxPagesPossible });
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { name, hsn, rate, tax, group } = req.body;
    let data = {
      name,
      hsn,
      rate,
      tax,
      group,
    };
    await Product.updateOne({ _id: id }, data).exec();
    return res.status(200).json({ message: "Product Updated Successfully" });
  } catch (error) {
    handleError("Product Updation Error", __filename, error);
    return res.status(500).json({ error: "Product Updation Error", description: error });
  }
});

module.exports = router;
