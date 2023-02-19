import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductTable from "../components/Product/ProductTable";
import { ProductContext } from "../context/Provider/ProductContext";

function Beneficiary() {
  const { allProducts } = useContext(ProductContext);
  return (
    <>
      <h1>Products</h1>
      <ProductTable allProducts={allProducts} />
      <Link to="./add">Add Product</Link>
    </>
  );
}

export default Beneficiary;
