import { useEffect, useState } from "react";
import { useFetch } from "../hooks";

export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const getBillData = async () => {
      const { message } = await useFetch("/api/bill/view", "GET");
      setInvoices(message.data);
      console.log(message.data);
    };
    getBillData();
  }, []);
  return (
    <div>
      <h1>Invoice</h1>
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
