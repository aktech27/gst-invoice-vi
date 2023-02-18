import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useProducts } from "../hooks";
import Loading from "../components/Loading";
import ProductTable from "../components/Product/ProductTable";
import { LoadingContext } from "../context/Provider/LoadingContext";

function Beneficiary() {
  const [allProducts, setallProducts] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function getAllProducts() {
      let data = await useProducts();
      setallProducts(data);
      setIsLoading(false);
    }
    setIsLoading(true);
    getAllProducts();
  }, []);
  return (
    <>
      <h1>Products</h1>
      <ProductTable allProducts={allProducts} />
      <Link to="./add">Add Product</Link>
    </>
  );
}

export default Beneficiary;
