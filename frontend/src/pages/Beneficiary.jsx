import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import BeneficiaryCard from "../components/Beneficiary/BeneficiaryCard";
import { BeneficiaryContext } from "../context/Provider/BeneficiaryContext";

function Beneficiary() {
  const { allBeneficiaries } = useContext(BeneficiaryContext);
  const [filteredList, setFilteredList] = useState([]);
  const search = useRef();

  function handleSearchChange(e) {
    setFilteredList(
      allBeneficiaries.filter(
        (beneficiary) =>
          beneficiary.name.match(new RegExp(search.current.value, "i")) ||
          beneficiary.gstin.match(new RegExp(search.current.value, "i"))
      )
    );
  }

  return (
    <>
      <h1>Manage Beneficiary</h1>
      <input
        type="search"
        placeholder="Search by name or gstin"
        onChange={handleSearchChange}
        ref={search}
      />
      <div className="beneficiary-container">
        {search.current?.value ? (
          filteredList.length ? (
            <>
              {filteredList.map((beneficiary) => (
                <BeneficiaryCard key={beneficiary._id} details={beneficiary} />
              ))}
            </>
          ) : (
            <>
              <h3>No results found for given search</h3>
            </>
          )
        ) : allBeneficiaries.length ? (
          <>
            {allBeneficiaries &&
              allBeneficiaries.map((beneficiary) => (
                <BeneficiaryCard key={beneficiary._id} details={beneficiary} />
              ))}
          </>
        ) : (
          <>
            <h3>No Beneficiaries available. Add Now</h3>
          </>
        )}
      </div>
      <Link to="./add">Add Beneficiary</Link>
    </>
  );
}

export default Beneficiary;
