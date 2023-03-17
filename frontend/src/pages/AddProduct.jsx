import { useContext } from "react";
import { ProductContext } from "../context/Provider/ProductContext";
import { ToastContext } from "../context/Provider/ToastContext";
import { useFetch } from "../hooks";

function AddProduct() {
  const { dispatch } = useContext(ProductContext);
  const { setShowToast, setToastContent } = useContext(ToastContext);
  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={(e) => handleSubmit(e, dispatch, setShowToast, setToastContent)}>
        <input id="name" placeholder="Name" />
        <input id="hsn" placeholder="HSN" />
        <select name="group" id="group" defaultValue={"General"}>
          <option value={"General"}>General</option>
          <option value={"Techno"}>Techno</option>
          <option value={"DC"}>DC</option>
        </select>
        <select name="tax" id="tax" defaultValue={9}>
          <option value={2.5}>2.5+2.5</option>
          <option value={6}>6+6</option>
          <option value={9}>9+9</option>
          <option value={14}>14+14</option>
        </select>
        <input id="rate" placeholder="Rate" />
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

async function handleSubmit(e, dispatch, setShowToast, setToastContent) {
  e.preventDefault();
  let [name, group, hsn, tax, rate] = ["name", "group", "hsn", "tax", "rate"].map(
    (id) => document.querySelector(`#${id}`).value
  );
  let details = { name, group, hsn: parseInt(hsn), tax, rate: parseFloat(rate) };
  let response = await useFetch("/api/product/new", "POST", details);
  dispatch({ type: "ADD", payload: response.message.newProduct });
  setToastContent({ message: response.message.message, type: "success" });
  setShowToast(true);
}

export default AddProduct;
