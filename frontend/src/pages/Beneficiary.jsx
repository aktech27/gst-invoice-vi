import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBeneficiary, useFetch, useHello } from "../../hooks";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";

function Beneficiary() {
  const [allBeneficiaries, setAllBeneficiaries] = useState([]);

  useEffect(() => {
    async function getAllBeneficiary() {
      let data = await useBeneficiary();
      setAllBeneficiaries(data);
    }
    getAllBeneficiary();
  }, []);
  return (
    <>
      <h1>Manage Beneficiary</h1>
      <div className="beneficiary-container">
        {allBeneficiaries &&
          allBeneficiaries.map((beneficiary) => (
            <BeneficiaryCard key={beneficiary._id} details={beneficiary} />
          ))}
      </div>
      <Link to="./add">Add Beneficiary</Link>
    </>
  );
}

export default Beneficiary;
