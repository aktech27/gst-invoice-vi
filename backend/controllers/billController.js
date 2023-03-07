const Bill = require("../models/Bills");
const generatePDF = require("../misc/pdfGenerator");
const hbsCompiler = require("../misc/hbsCompiler");
const fs = require("fs");

function handleErrorResponse(errorTitle = "Error in Bill route", error, res) {
  if (error.code === 11000)
    return res.status(400).json({ error: "Duplicate Bill Number Error", description: error });

  handleError(errorTitle, __filename, error);
  return res.status(500).json({ error: errorTitle, description: error });
}

function groupProductsByHSN(products, tax) {
  let groupByHsn = new Object();
  products.forEach((product) => {
    if (groupByHsn.hasOwnProperty(product.item.hsn)) {
      groupByHsn[product.item.hsn].amount += product.amount;
    } else {
      groupByHsn[product.item.hsn] = { amount: product.amount, tax };
    }
  });
  return groupByHsn;
}

async function queryBill(options = {}, lean = false) {
  // returns array
  return await Bill.find(options).lean(lean).populate("to").populate("products.item").exec();
}

function getFinancialYear() {
  //Till March, falls under previous financial year
  let startYear =
    new Date().getMonth() <= 2 ? new Date().getFullYear() - 1 : new Date().getFullYear();
  let endYear = startYear + 1;

  // Current Financial Year
  let startDate = new Date(startYear, 3, 1);
  let endDate = new Date(endYear, 2, 31);
  return { startDate, endDate };
}

const generateNew = async (req, res) => {
  try {
    let { number, date, to, products, vehicle, dc } = req.body;
    let newBill = await new Bill({ number, date, to, products, vehicle, dc }).save();
    return res.status(200).json({ message: "Bill Creation Successful", data: newBill });
  } catch (error) {
    handleErrorResponse("Bill Creation Error", error, res);
  }
};

const viewInvoices = async (req, res) => {
  let { startDate, endDate } = getFinancialYear();
  let data = await queryBill({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  res.status(200).json({ data });
};

const billNumber = async (req, res) => {
  let recentBillNo = await Bill.find().sort({ number: -1 }).limit(1).select("number");
  if (!recentBillNo.length) return res.status(200).json({ billNo: 0 }); //No bills as of now
  return res.status(200).json({ billNo: recentBillNo[0].number });
};

const previewInvoice = async (req, res) => {
  let [data] = await queryBill({ _id: req.params.id });
  res.status(200).json({ data });
};

const downloadInvoice = async (req, res) => {
  let [data] = await queryBill({ _id: req.params.id }, true);
  console.log(data);
  data.number = data.number.toString().padStart(3, "0");
  let total = data.products.reduce((accumulator, product) => accumulator + product.amount, 0);

  let tax =
    data.to.gstin.substring(0, 2) === "33"
      ? {
          sgst: 9,
          cgst: 9,
          igst: 0,
        }
      : { sgst: 0, cgst: 0, igst: 18 };

  let others = {
    css: { blankSpace: `${40 * data.products.length}px` },
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
  let groupByHsn = groupProductsByHSN(data.products, tax);
  const hbsTemplate = fs.readFileSync(`${process.cwd()}/template/bill-template-test.hbs`, "utf8");
  const html = await hbsCompiler(hbsTemplate, { details: { ...data, ...others, groupByHsn } });
  let billNo = data.number.toString().padStart(3, "0");
  await generatePDF(html, billNo);
  res.download(`${process.cwd()}/output/Invoice-${billNo}.pdf`);
};

module.exports = { generateNew, viewInvoices, billNumber, previewInvoice, downloadInvoice };
