import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBeneficiary, useFetch, useHello } from "../../hooks";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";

function Beneficiary() {
  const [allBeneficiaries, setAllBeneficiaries] = useState([]);
  const greet = useHello();

  useEffect(() => {
    async function getAllBeneficiary() {
      let data = await useBeneficiary();
      setAllBeneficiaries(data);
    }
    async function dow() {
      let res = await fetch("/api/bill/download/63b26652b31ad82cd9431840", {
        method: "GET",
      });
      let pdf = await res.blob();
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(pdf);
      a.download = "FILENAME";
      a.click();
    }
    getAllBeneficiary();
    //dow();
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
