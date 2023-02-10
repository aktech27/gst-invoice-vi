import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../../hooks";
import Loading from "../components/Loading";

function Beneficiary() {
  const [allProducts, setallProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllProducts() {
      let data = await useProducts();
      setallProducts(data);
      setLoading(false);
    }
    setLoading(true);
    getAllProducts();
  }, []);
  return (
    <>
      {loading && <Loading />}
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
