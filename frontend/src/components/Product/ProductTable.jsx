import { useState, useContext, useEffect } from "react";
import styles from "./Product.module.css";
import ProductRow from "./ProductRow";
import EditModal from "./EditModal";
import { ProductContext } from "../../context/Provider/ProductContext";
import { useFetch } from "../../hooks";
import { LoadingContext } from "../../context/Provider/LoadingContext";

export default function ProductTable({ allProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch, maxPages } = useContext(ProductContext);
  const { setIsLoading } = useContext(LoadingContext);
  function handleProductClick(product) {
    setShowModal(true);
    setModalData(product);
  }
  async function handlePageClick(number) {
    if (number != currentPage) {
      setIsLoading(true);
      setCurrentPage(number);
      let { message } = await useFetch(`/api/product/view?currentPage=${number}`, "GET");
      dispatch({ type: "LOAD", payload: message.data });
      setIsLoading(false);
    }
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
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className={styles.tableFooter}>
                {[...Array(maxPages).keys()].map((page) => {
                  return (
                    <div key={page} onClick={() => handlePageClick(page + 1)}>
                      {page + 1}
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
