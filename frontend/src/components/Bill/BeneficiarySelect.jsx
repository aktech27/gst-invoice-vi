import styles from "./Bill.module.css";
import { useEffect, useState } from "react";
import { useBeneficiary } from "../../../hooks";

function BeneficiarySelect() {
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  useEffect(() => {
    async function getAllBeneficiary() {
      let data = await useBeneficiary();
      setBeneficiaryList(data);
    }

    getAllBeneficiary();
  }, []);
  return (
    <>
      <label htmlFor="beneficiary"> Choose Beneficiary : </label>
      <select name="beneficiary" id="to">
        {beneficiaryList.map((beneficiary) => (
          <option key={beneficiary.gstin} value={beneficiary._id}>
            {beneficiary.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default BeneficiarySelect;
