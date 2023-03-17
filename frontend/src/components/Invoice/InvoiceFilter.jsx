import { useContext } from "react";
import { BeneficiaryContext } from "../../context/Provider/BeneficiaryContext";

export default function InvoiceFilter({ getBillData }) {
  const { allBeneficiaries } = useContext(BeneficiaryContext);

  function handleFiltersApplied() {
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;
    const billedTo = document.querySelector("#beneficiary").value;
    let queryString = "";
    if (startDate && endDate) queryString = `startDate=${startDate}&endDate=${endDate}&`;
    if (billedTo) queryString += `billedTo=${billedTo}`;
    getBillData(queryString);
  }

  function handleClearFilters() {
    document.querySelector("#start-date").value = "";
    document.querySelector("#end-date").value = "";
    document.querySelector("#beneficiary").selectedIndex = 0;
    getBillData();
  }

  return (
    <div className="invoice-filters-container">
      <h3>Filter By</h3>
      <label htmlFor="start-date">
        Start Date:
        <input type="date" id="start-date" />
      </label>
      <label htmlFor="end-date">
        End Date:
        <input type="date" id="end-date" />
      </label>
      <label htmlFor="beneficiary">
        Billed To:
        <select id="beneficiary">
          <option value="">All</option>
          {allBeneficiaries.map((beneficiary) => (
            <option key={beneficiary._id} value={beneficiary._id}>
              {beneficiary.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleFiltersApplied}>Apply Filters</button>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </div>
  );
}
