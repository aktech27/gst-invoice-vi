import styles from "./Invoice.module.css";

export default function InvoiceTable({ children }) {
  return (
    <table className={styles.invoiceTable}>
      <thead>
        <tr>
          <th>Bill No</th>
          <th>Date</th>
          <th>Bill To</th>
          <th>Amount</th>
          <th>Tax</th>
          <th>Total</th>
        </tr>
      </thead>
      {children}
    </table>
  );
}
