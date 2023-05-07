const DC = require("../models/DCs");
const generatePDF = require("../misc/pdfGenerator");
const hbsCompiler = require("../misc/hbsCompiler");
const fs = require("fs");

function handleErrorResponse(errorTitle = "Error in DC route", error, res) {
  if (error.code === 11000)
    return res.status(400).json({ error: "Duplicate Bill Number Error", description: error });

  handleError(errorTitle, __filename, error);
  return res.status(500).json({ error: errorTitle, description: error });
}

function getFinancialYear(dcDate = Date.now()) {
  //Till March, falls under previous financial year
  let startYear =
    new Date(dcDate).getMonth() <= 2
      ? new Date(dcDate).getFullYear() - 1
      : new Date(dcDate).getFullYear();
  let endYear = startYear + 1;

  // Current Financial Year
  let startDate = new Date(startYear, 3, 1);
  let endDate = new Date(endYear, 2, 31);
  return { startDate, endDate };
}

const generateNew = async (req, res) => {
  try {
    let { number, date, to, products, vehicle, dc } = req.body;

    let test = await new DC({ number, date, to, products, vehicle, dc }).save();
    return res.status(200).json({ message: "DC Creation Successful", data: test });
  } catch (error) {
    handleErrorResponse("Error in DC route", error, res);
  }
};

const viewAll = async (req, res) => {
  try {
    let { startDate, endDate } = getFinancialYear();
    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(req.query.startDate);
      endDate = new Date(req.query.endDate);
    }
    let data = await DC.find({ date: { $gte: startDate, $lte: endDate } })
      .lean(true)
      .populate("to")
      .populate("products.item")
      .exec();
    res.status(200).json({ data });
  } catch (error) {
    handleErrorResponse("Error in DC route", error, res);
  }
};

const dcNumber = async (req, res) => {
  try {
    let { startDate, endDate } = getFinancialYear(req.query.dcDate);
    let option = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    let recentDCNo = await DC.find(option).sort({ number: -1 }).limit(1).select("number");
    if (!recentDCNo.length) return res.status(200).json({ dcNo: 0 }); //No DCs as of now
    return res.status(200).json({ dcNo: recentDCNo[0].number });
  } catch (error) {
    handleErrorResponse("Error in DC route", error, res);
  }
};

const viewOne = async (req, res) => {
  try {
    let data = await DC.findOne({ _id: req.params.id })
      .populate("to")
      .populate("products.item")
      .exec();
    res.status(200).json({ data });
  } catch (error) {
    handleErrorResponse("Error in DC route", error, res);
  }
};

const downloadDC = async (req, res) => {
  try {
    let data = await DC.findOne({ _id: req.params.id })
      .lean()
      .populate("to")
      .populate("products.item")
      .exec();
    data.number = data.number.toString().padStart(3, "0");
    data.totalValue = data.products.reduce((accum, product) => accum + product.value, 0);
    const hbsTemplate = fs.readFileSync(`${process.cwd()}/template/dc-template.hbs`, "utf8");
    const html = await hbsCompiler(hbsTemplate, { details: { ...data } });
    let dcNo = data.number.toString().padStart(3, "0");
    await generatePDF(html, dcNo, "DC");
    res.download(`${process.cwd()}/output/DC-${dcNo}.pdf`);
  } catch (error) {
    handleErrorResponse("Error in DC route", error, res);
  }
};

const deleteDC = async (req, res) => {
  try {
    const { id } = req.params;
    await DC.deleteOne({ _id: id });
    return res.status(200).json({ message: "DC Deleted Successfully" });
  } catch (error) {
    handleErrorResponse("Error in DC Deletion", error, res);
  }
};

module.exports = { generateNew, viewAll, dcNumber, viewOne, downloadDC, deleteDC };
