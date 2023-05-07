const {
  generateNew,
  viewInvoices,
  billNumber,
  previewInvoice,
  downloadInvoice,
  deleteInvoice,
} = require("../controllers/billController");

const router = require("express").Router();

router.post("/new", generateNew);

router.get("/view", viewInvoices);

router.get("/billnumber", billNumber);

router.get("/view/:id", previewInvoice);

router.get("/download/:id", downloadInvoice);

router.delete("/delete/:id", deleteInvoice);

module.exports = router;
