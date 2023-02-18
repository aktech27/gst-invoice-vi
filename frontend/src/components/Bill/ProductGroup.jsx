import { useEffect, useState, useRef } from "react";
import { useFetch, useProducts } from "../../hooks";
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
  const groupSelector = useRef();
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(false);
  const [productGroups, setProductGroups] = useState([]);
  const [productInput, setProductInput] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      let { message } = await useFetch("/api/product/groups", "GET");
      setProductGroups(message);
      setAllProducts(await useProducts());
    }
    getAllProducts();
  }, []);

  function handleAdd() {
    setProductInput((prev) => {
      return [
        ...prev,
        <ProductInput
          key={productInput.length}
          products={allProducts}
          groupSelector={groupSelector}
        />,
      ];
    });
  }

  function handleGroupSelect() {
    if (groupSelector.current.value !== "All")
      setAllProducts((prev) => prev.filter((p) => p.group === groupSelector.current.value));
    setFilter(true);
  }

  return (
    <>
      <div id="product-list">{productInput.map((input) => input)}</div>
      {!filter ? (
        <select ref={groupSelector} onChange={handleGroupSelect}>
          <option hidden>Select One</option>
          {productGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
          <option value="All">All Groups</option>
        </select>
      ) : (
        <button type="button" onClick={handleAdd}>
          ADD
        </button>
      )}
    </>
  );
}

export default ProductGroup;
