import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../../hooks";

function Beneficiary() {
  const [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      let data = await useProducts();
      setallProducts(data);
    }
    getAllProducts();
  }, []);
  return (
    <>
      <h1>Products</h1>
      {allProducts &&
        allProducts.map((product) => (
          <div key={product._id}>
            {product._id} - {product.name}
          </div>
        ))}
      <Link to="./add">Add Product</Link>
    </>
  );
}

export default Beneficiary;
