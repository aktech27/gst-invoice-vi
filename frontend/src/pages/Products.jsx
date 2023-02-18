import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../hooks";
import Loading from "../components/Loading";
import ProductTable from "../components/Product/ProductTable";

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
      <ProductTable allProducts={allProducts} />
      <Link to="./add">Add Product</Link>
    </>
  );
}

export default Beneficiary;
