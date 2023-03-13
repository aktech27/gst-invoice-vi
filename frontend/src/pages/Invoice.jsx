import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeneficiaryContext } from "../context/Provider/BeneficiaryContext";
import { useFetch } from "../hooks";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const { allBeneficiaries } = useContext(BeneficiaryContext);

  const getBillData = async (queryString = "") => {
    const { message } = await useFetch(`/api/bill/view?${queryString}`, "GET");
    setInvoices(message.data);
  };

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

  useEffect(() => {
    getBillData();
  }, []);
  return (
    <div>
      <h1>Invoice History</h1>
      <Link to="/bill/new">Generate New</Link>
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
      <table>
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Date</th>
            <th>Bill To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice._id}>
                <td>{invoice.number}</td>
                <td>{invoice.date}</td>
                <td>{invoice.to?.name}</td>
                <td>{invoice?.products[0]?.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
