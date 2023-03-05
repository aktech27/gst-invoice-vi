const {
  generateNew,
  viewInvoices,
  billNumber,
  previewInvoice,
  downloadInvoice,
} = require("../controllers/billController");

const router = require("express").Router();

router.post("/new", generateNew);

router.get("/view", viewInvoices);

router.get("/billnumber", billNumber);

router.get("/view/:id", previewInvoice);

router.get("/download/:id", downloadInvoice);

module.exports = router;
