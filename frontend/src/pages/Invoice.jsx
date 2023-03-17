import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoiceFilter from "../components/Invoice/InvoiceFilter";
import InvoiceTable from "../components/Invoice/InvoiceTable";
import { useFetch } from "../hooks";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);

  const getBillData = async (queryString = "") => {
    const { message } = await useFetch(`/api/bill/view?${queryString}`, "GET");
    setInvoices(message.data);
  };

  const formatData = (data, type) => {
    switch (type) {
      case "DATE":
        let date = data.toString().split("T")[0];
        const [year, month, day] = date.toString().split("-");
        return `${day}-${month}-${year}`;

      case "NUMBER":
        return data.toString().padStart(3, "0");

      case "AMOUNT":
        return parseFloat(data.reduce((accumulator, d) => accumulator + d.amount, 0.0)).toFixed(2);

      case "TAX":
        return parseFloat(
          data.reduce((accumulator, d) => accumulator + d.amount, 0.0) * 0.18
        ).toFixed(2);

      case "TOTAL":
        let amount = parseFloat(data.reduce((accumulator, d) => accumulator + d.amount, 0.0));
        return parseFloat(amount + amount * 0.18).toFixed(2);

      default:
        return data;
    }
  };

  useEffect(() => {
    getBillData();
  }, []);

  return (
    <div>
      <h1>Invoice History</h1>
      <Link to="/bill/new">Generate New</Link>
      <InvoiceFilter getBillData={getBillData} />
      <InvoiceTable>
        <tbody>
          {invoices.map((invoice) => {
            console.log(invoice);
            return (
              <tr key={invoice._id}>
                <td>{formatData(invoice.number, "NUMBER")}</td>
                <td>{formatData(invoice.date, "DATE")}</td>
                <td>{invoice.to?.name}</td>
                <td>{formatData(invoice.products, "AMOUNT")}</td>
                <td>{formatData(invoice.products, "TAX")}</td>
                <td>{formatData(invoice.products, "TOTAL")}</td>
              </tr>
            );
          })}
        </tbody>
      </InvoiceTable>
    </div>
  );
}
