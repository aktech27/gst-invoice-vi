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

function calculateGST(total, gst) {
  let amount = (total * (gst / 100)).toFixed(2);
  let [rs, p] = amount.split(".");
  return {
    rs,
    p,
  };
}

function calculateTaxTotal(...taxes) {
  return taxes
    .reduce((accumulator, tax) => accumulator + parseFloat(tax.rs) + parseFloat(tax.p / 100), 0.0)
    .toFixed(2);
}

function computeGSTAndTotals(total, tax) {
  let cgst = calculateGST(total, tax.cgst);
  let sgst = calculateGST(total, tax.sgst);
  let igst = calculateGST(total, tax.igst);
  let taxtotal = calculateTaxTotal(cgst, sgst, igst);
  let grand = Math.floor(parseFloat(total) + parseFloat(taxtotal));
  return {
    cgst,
    sgst,
    igst,
    taxtotal,
    grandtotal: {
      rs: grand,
      p: "00",
    },
  };
}

async function queryBill(options = {}, lean = false) {
  // returns array
  return await Bill.find(options).lean(lean).populate("to").populate("products.item").exec();
}

function getFinancialYear(billDate = Date.now()) {
  //Till March, falls under previous financial year
  let startYear =
    new Date(billDate).getMonth() <= 2
      ? new Date(billDate).getFullYear() - 1
      : new Date(billDate).getFullYear();
  let endYear = startYear + 1;

  // Current Financial Year
  let startDate = new Date(startYear, 3, 1);
  let endDate = new Date(endYear, 2, 31);
  return { startDate, endDate };
}

const generateNew = async (req, res) => {
  try {
    let { number, date, to, products, vehicle, dc, deliveryAt } = req.body;
    let newBill = await new Bill({ number, date, to, products, vehicle, dc, deliveryAt }).save();
    return res.status(200).json({ message: "Bill Creation Successful", data: newBill });
  } catch (error) {
    handleErrorResponse("Bill Creation Error", error, res);
  }
};

const viewInvoices = async (req, res) => {
  try {
    let { startDate, endDate } = getFinancialYear();
    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(req.query.startDate);
      endDate = new Date(req.query.endDate);
    }
    let queryOptions = {
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    if (req.query.billedTo) queryOptions["to"] = req.query.billedTo;
    let data = await queryBill(queryOptions);
    res.status(200).json({ data });
  } catch (error) {
    handleErrorResponse("Unable to apply filters", error, res);
  }
};

const billNumber = async (req, res) => {
  let { startDate, endDate } = getFinancialYear(req.query.billDate);
  let option = {
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  };
  let recentBillNo = await Bill.find(option).sort({ number: -1 }).limit(1).select("number");
  if (!recentBillNo.length) return res.status(200).json({ billNo: 0 }); //No bills as of now
  return res.status(200).json({ billNo: recentBillNo[0].number });
};

const previewInvoice = async (req, res) => {
  let [data] = await queryBill({ _id: req.params.id });
  res.status(200).json({ data });
};

const downloadInvoice = async (req, res) => {
  try {
    let [data] = await queryBill({ _id: req.params.id }, true);
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
      subtotal: { rs: total.toFixed(2).split(".")[0], p: total.toFixed(2).split(".")[1] },
      tax,
      ...computeGSTAndTotals(total, tax),
    };
    let groupByHsn = groupProductsByHSN(data.products, tax);
    const hbsTemplate = fs.readFileSync(`${process.cwd()}/template/bill-template-test.hbs`, "utf8");
    const html = await hbsCompiler(hbsTemplate, { details: { ...data, ...others, groupByHsn } });
    let billNo = data.number.toString().padStart(3, "0");
    await generatePDF(html, billNo);
    res.download(`${process.cwd()}/output/Invoice-${billNo}.pdf`);
  } catch (error) {
    handleErrorResponse("Error in Bill Genereation", error, res);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    await Bill.deleteOne({ _id: id });
    return res.status(200).json({ message: "Bill Deleted Successfully" });
  } catch (error) {
    handleErrorResponse("Error in Bill Deletion", error, res);
  }
};

module.exports = {
  generateNew,
  viewInvoices,
  billNumber,
  previewInvoice,
  downloadInvoice,
  deleteInvoice,
};
