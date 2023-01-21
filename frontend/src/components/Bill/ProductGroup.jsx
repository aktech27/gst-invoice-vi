import { useEffect, useState } from "react";
import { useProducts } from "../../../hooks";

function ProductInput({ products }) {
  return (
    <>
      <select name="products">
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
      </select>
      <input type="text" className="quantity" />
      <input type="text" className="rate" />
    </>
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
        Add
      </button>
    </>
  );
}

export default ProductGroup;
