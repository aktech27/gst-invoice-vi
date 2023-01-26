const Bill = require("../models/Bills");
const router = require("express").Router();
const generatePDF = require("../misc/pdfGenerator");
const hbsCompiler = require("../misc/hbsCompiler");
const fs = require("fs");

router.post("/new", async (req, res) => {
  console.log(req.body);
  try {
    let { number, date, to, products, vehicle } = req.body;

    let test = await new Bill({ number, date, to, products, vehicle }).save();
    return res.status(200).json({ message: "Bill Creation Successful", data: test });
  } catch (error) {
    handleError("Bill Creation Error", __filename, error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/view", async (req, res) => {
  let data = await Bill.find({}).populate("to").populate("products.item").exec();
  console.log(data);
  res.status(200).json({ data });
});

router.get("/billnumber", async (req, res) => {
  let recentBillNo = await Bill.find().sort({ number: -1 }).limit(1).select("number");
  return res.status(200).json({ billNo: recentBillNo[0].number });
});

router.get("/view/:id", async (req, res) => {
  let data = await Bill.findOne({ _id: req.params.id })
    .populate("to")
    .populate("products.item")
    .exec();
  res.status(200).json({ data });
});

router.get("/download/:id", async (req, res) => {
  let data = await Bill.findOne({ _id: req.params.id })
    .lean()
    .populate("to")
    .populate("products.item")
    .exec();
  data.number = data.number.toString().padStart(3, "0");
  let total = 0;
  let tax =
    data.to.gstin.substring(0, 2) === "33"
      ? {
          sgst: 9,
          cgst: 9,
          igst: 0,
        }
      : { sgst: 0, cgst: 0, igst: 18 };
  data.products.forEach((product) => (total += product.amount));
  let others = {
    subtotal: { rs: total, p: "00" },
    tax,
    cgst: {
      rs: total * (tax.cgst / 100),
      p: "00",
    },
    sgst: {
      rs: total * (tax.sgst / 100),
      p: "00",
    },
    igst: {
      rs: total * (tax.igst / 100),
      p: "00",
    },
    taxtotal: total * 0.18,
    grandtotal: { rs: total + total * 0.18, p: "00" },
  };
  const hbsTemplate = fs.readFileSync(`${process.cwd()}/template/bill-template-test.hbs`, "utf8");
  const html = await hbsCompiler(hbsTemplate, { details: { ...data, ...others } });
  let billNo = data.number.toString().padStart(3, "0");
  await generatePDF(html, billNo);
  res.download(`${process.cwd()}/output/Invoice-${billNo}.pdf`);
});

module.exports = router;
