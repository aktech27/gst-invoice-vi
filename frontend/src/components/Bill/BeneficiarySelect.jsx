import { useContext } from "react";
import { BeneficiaryContext } from "../../context/Provider/BeneficiaryContext";

function BeneficiarySelect() {
  const { allBeneficiaries } = useContext(BeneficiaryContext);
  const sortAlphabetically = (a, b) => {
    if (a.name < b.name) return -1;
    return 1;
  };
  return (
    <>
      <label htmlFor="beneficiary"> Choose Beneficiary : </label>
      <select name="beneficiary" id="to" defaultValue="Choose one">
        <option hidden>Choose</option>
        {allBeneficiaries.sort(sortAlphabetically).map((beneficiary) => (
          <option key={beneficiary.gstin} value={beneficiary._id}>
            {beneficiary.name}
          </option>
        ))}
      </select>
      <label htmlFor="deliveryAt"> Delivery At :</label>
      <input type="text" id="deliveryAt" />
    </>
  );
}

export default BeneficiarySelect;
