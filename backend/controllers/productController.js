const Product = require("../models/Products");

function handleErrorResponse(errorTitle = "Error in Product route", error, res) {
  if (error.code === 11000)
    return res.status(400).json({ error: "Duplicate Bill Number Error", description: error });

  handleError(errorTitle, __filename, error);
  return res.status(500).json({ error: errorTitle, description: error });
}

const newProduct = async (req, res) => {
  try {
    let { name, hsn, rate, tax, group } = req.body;
    let newProduct = await new Product({ name, hsn, rate, tax, group }).save();
    return res.status(200).json({ message: "Product Creation Successful", newProduct });
  } catch (error) {
    handleErrorResponse("Error in creating new product", error, res);
  }
};

const getProductGroups = async (req, res) => {
  try {
    let groupsArray = await Product.distinct("group");
    return res.status(200).json(groupsArray);
  } catch (error) {
    handleErrorResponse("Error in getting product groups", error, res);
  }
};

const getProductsByPage = async (req, res) => {
  try {
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
  } catch (error) {
    handleErrorResponse("Unable to get Products", error, res);
  }
};

const getAllProducts = async (req, res) => {
  try {
    let allProducts = await Product.find({}).sort({ name: 1 });
    res.status(200).json({ data: allProducts });
  } catch (error) {
    handleErrorResponse("Unable to get All Products", error, res);
  }
};

const editProduct = async (req, res) => {
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
    handleErrorResponse("Unable to update product", error, res);
  }
};

module.exports = { newProduct, getProductGroups, getProductsByPage, getAllProducts, editProduct };
