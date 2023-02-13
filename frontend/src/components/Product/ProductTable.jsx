import React from "react";
import styles from "./Product.module.css";

export default function ProductTable({ allProducts }) {
  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>HSN</th>
          <th>Rate</th>
          <th>Tax</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {allProducts &&
          allProducts.map((product, index) => (
            <tr key={product._id} onClick={() => handleProductClick(product._id)}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.hsn}</td>
              <td>{product.rate}</td>
              <td>{product.tax}</td>
              <td>{product.group}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function handleProductClick(id) {
  console.log(id);
}
