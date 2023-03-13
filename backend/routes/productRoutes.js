const {
  newProduct,
  getProductGroups,
  getProductsByPage,
  getAllProducts,
  editProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/new", newProduct);

router.get("/groups", getProductGroups);

router.get("/view", getProductsByPage);

router.get("/all", getAllProducts);

router.put("/edit/:id", editProduct);

module.exports = router;
