import { useEffect, useState } from "react";
import { useProducts } from "../../../hooks";
import styles from "./Bill.module.css";

function ProductInput({ products }) {
  return (
    <div className={styles.productGroup}>
      <select name="products" defaultValue="Select Product">
        <option hidden>Select</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
      </select>
      <input type="text" className="quantity" placeholder="Quantity" />
      <input type="text" className="rate" placeholder="Rate" />
    </div>
  );
}

function ProductGroup() {
  const [productList, setProductList] = useState([]);
  const [productInput, setProductInput] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      let data = await useProducts();
      setProductList(data);
    }
    getAllProducts();
  }, []);

  function handleAdd() {
    setProductInput((prev) => {
      return [...prev, <ProductInput key={productInput.length} products={productList} />];
    });
  }

  return (
    <>
      <div id="product-list">{productInput.map((input) => input)}</div>
      <button type="button" onClick={handleAdd}>
        ADD
      </button>
    </>
  );
}

export default ProductGroup;
