const {
  generateNew,
  viewAll,
  dcNumber,
  viewOne,
  downloadDC,
  deleteDC,
} = require("../controllers/dcController");

const router = require("express").Router();

router.post("/new", generateNew);

router.get("/view", viewAll);

router.get("/dcnumber", dcNumber);

router.get("/view/:id", viewOne);

router.get("/download/:id", downloadDC);

router.delete("/delete/:id", deleteDC);

module.exports = router;
