import { useState } from "react";
import styles from "./Product.module.css";
import ProductRow from "./ProductRow";
import EditModal from "./EditModal";

export default function ProductTable({ allProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  function handleProductClick(product) {
    setShowModal(true);
    setModalData(product);
  }

  return (
    <>
      {showModal && <EditModal data={modalData} set={setShowModal} />}
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
              <ProductRow
                key={product._id}
                product={product}
                index={index}
                action={handleProductClick}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}
