import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBeneficiary } from "../hooks";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";
import Loading from "../components/Loading";

function Beneficiary() {
  const [allBeneficiaries, setAllBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllBeneficiary() {
      let data = await useBeneficiary();
      setAllBeneficiaries(data);
      setLoading(false);
    }
    setLoading(true);
    getAllBeneficiary();
  }, []);
  return (
    <>
      {loading && <Loading />}
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
