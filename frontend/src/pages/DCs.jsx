import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoiceFilter from "../components/Invoice/InvoiceFilter";
import InvoiceTable from "../components/Invoice/InvoiceTable";
import { useFetch } from "../hooks";
import { MdDeleteForever } from "react-icons/md";
import { ToastContext } from "../context/Provider";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);

  const { setShowToast, setToastContent } = useContext(ToastContext);

  const getBillData = async (queryString = "") => {
    const { message } = await useFetch(`/api/bill/view?${queryString}`, "GET");
    setInvoices(message.data);
  };

  const handleInvoiceDelete = async (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      let { message } = await useFetch(`/api/bill/delete/${id}`, "DELETE");
      setToastContent({ message: message.message, type: "success" });
      setShowToast(true);
      getBillData();
    }
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
                <td>
                  <button
                    onClick={() => {
                      handleInvoiceDelete(invoice._id);
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </InvoiceTable>
    </div>
  );
}
