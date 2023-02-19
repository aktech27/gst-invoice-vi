import { Link } from "react-router-dom";
import { useContext } from "react";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";
import { BeneficiaryContext } from "../context/Provider/BeneficiaryContext";

function Beneficiary() {
  const { allBeneficiaries } = useContext(BeneficiaryContext);
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
