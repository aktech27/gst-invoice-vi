import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useBeneficiary } from "../hooks";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";
import Loading from "../components/Loading";
import { LoadingContext } from "../context/Provider/LoadingContext";

function Beneficiary() {
  const [allBeneficiaries, setAllBeneficiaries] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    async function getAllBeneficiary() {
      let data = await useBeneficiary();
      setAllBeneficiaries(data);
      setIsLoading(false);
    }
    setIsLoading(true);
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
