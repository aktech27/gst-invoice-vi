const router = require("express").Router();
const { addOne, editOne, deleteOne, viewAll } = require("../controllers/beneficiaryControllers");

router.post("/new", addOne);

router.put("/edit/:id", editOne);

router.delete("/delete/:id", deleteOne);

router.get("/view", viewAll);

module.exports = router;
