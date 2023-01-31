const DC = require("../models/DCs");
const router = require("express").Router();
const generatePDF = require("../misc/pdfGenerator");
const hbsCompiler = require("../misc/hbsCompiler");
const fs = require("fs");

router.post("/new", async (req, res) => {
  try {
    let { number, date, to, products, vehicle, dc } = req.body;

    let test = await new DC({ number, date, to, products, vehicle, dc }).save();
    return res.status(200).json({ message: "DC Creation Successful", data: test });
  } catch (error) {
    handleError("DC Creation Error", __filename, error);
    return res.status(500).json({ error: "Error" });
  }
});

router.get("/view", async (req, res) => {
  let data = await DC.find({}).populate("to").populate("products.item").exec();
  console.log(data);
  res.status(200).json({ data });
});

router.get("/dcnumber", async (req, res) => {
  let recentDCNo = await DC.find().sort({ number: -1 }).limit(1).select("number");
  return res.status(200).json({ dcNo: recentDCNo[0].number });
});

router.get("/view/:id", async (req, res) => {
  let data = await DC.findOne({ _id: req.params.id })
    .populate("to")
    .populate("products.item")
    .exec();
  res.status(200).json({ data });
});

router.get("/download/:id", async (req, res) => {
  let data = await DC.findOne({ _id: req.params.id })
    .lean()
    .populate("to")
    .populate("products.item")
    .exec();
  data.number = data.number.toString().padStart(3, "0");
  data.totalValue = data.products.reduce((accum, product) => accum + product.value, 0);
  console.log(data);
  const hbsTemplate = fs.readFileSync(`${process.cwd()}/template/dc-template.hbs`, "utf8");
  const html = await hbsCompiler(hbsTemplate, { details: { ...data } });
  let dcNo = data.number.toString().padStart(3, "0");
  await generatePDF(html, dcNo, "DC");
  res.download(`${process.cwd()}/output/DC-${dcNo}.pdf`);
});

module.exports = router;
