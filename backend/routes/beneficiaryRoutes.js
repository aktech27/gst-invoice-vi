const Beneficiary = require("../models/Beneficiaries");
const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    let { gstin, name, phone, address, email } = req.body;
    // let sgst = 9,
    //   cgst = 9,
    //   igst = 0;
    if (gstin.substring(0, 2) != "33") (sgst = 0), (cgst = 0), (igst = 18);
    let data = {
      gstin,
      name,
      phone,
      address,
      email,
    };
    let newB = await new Beneficiary(data).save();
    console.log(newB);
    return res.status(200).json({ message: "Beneficiary Creation Successful" });
  } catch (error) {
    handleError("Beneficiary Creation Error", __filename, error);
    return res.status(500).json({ error: "Beneficiary Creation Error", description: error });
  }
});

router.get("/view", async (req, res) => {
  let allBeneficiaries = await Beneficiary.find({});
  res.status(200).json({ data: allBeneficiaries });
});

module.exports = router;
