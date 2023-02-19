import { useContext } from "react";
import { BeneficiaryContext } from "../../context/Provider/BeneficiaryContext";

function BeneficiarySelect() {
  const { allBeneficiaries } = useContext(BeneficiaryContext);

  return (
    <>
      <label htmlFor="beneficiary"> Choose Beneficiary : </label>
      <select name="beneficiary" id="to" defaultValue="Choose one">
        <option hidden>Choose</option>
        {allBeneficiaries.map((beneficiary) => (
          <option key={beneficiary.gstin} value={beneficiary._id}>
            {beneficiary.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default BeneficiarySelect;
