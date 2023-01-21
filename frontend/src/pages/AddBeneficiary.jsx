import AddBeneficiaryForm from "../components/Beneficiary/AddBeneficiaryForm";
import BeneficiaryInput from "../components/Beneficiary/BeneficiaryInput";

function AddBeneficiary() {
  return (
    <>
      <h1>Add Beneficiary</h1>
      <AddBeneficiaryForm>
        <BeneficiaryInput id="gstin" label="GSTIN" />
        <BeneficiaryInput id="name" label="NAME" />
        <BeneficiaryInput id="phone" label="PHONE" />
        <BeneficiaryInput id="email" label="EMAIL" />
        <BeneficiaryInput id="address1" label="ADDRESS LINE 1" />
        <BeneficiaryInput id="address2" label="ADDRESS LINE 2" />
        <BeneficiaryInput id="address3" label="ADDRESS LINE 3" />
        <BeneficiaryInput id="pincode" label="PINCODE" />
      </AddBeneficiaryForm>
    </>
  );
}

export default AddBeneficiary;
