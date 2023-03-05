const Beneficiary = require("../models/Beneficiaries");

function requiredData(req) {
  // returns destructred data with gstin rates for add and update
  let { gstin, name, phone, address, email } = req.body;
  return { gstin, name, phone, address, email };
}
function handleErrorResponse(error, res) {
  if (error.code === 11000)
    return res.status(400).json({ error: "Duplicate GSTIN Error", description: error });

  handleError("Beneficiary Updation Error", __filename, error);
  return res.status(500).json({ error: "Beneficiary Updation Error", description: error });
}

const addOne = async (req, res) => {
  try {
    let data = requiredData(req);
    let newBeneficiary = await new Beneficiary(data).save();
    return res.status(200).json({ message: "Beneficiary Creation Successful", newBeneficiary });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const editOne = async (req, res) => {
  try {
    const { id } = req.params;

    let data = requiredData(req);

    await Beneficiary.updateOne({ _id: id }, data).exec();
    return res.status(200).json({ message: "Beneficiary Updated Successfully" });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    let test = await Beneficiary.deleteOne({ _id: id });
    console.log(test);
    return res.status(200).json({ message: "Beneficiary Deleted Successfully" });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const viewAll = async (req, res) => {
  let allBeneficiaries = await Beneficiary.find({});
  res.status(200).json({ data: allBeneficiaries });
};

module.exports = { addOne, editOne, deleteOne, viewAll };
