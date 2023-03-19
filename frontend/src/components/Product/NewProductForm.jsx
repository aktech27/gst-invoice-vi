import { useContext } from "react";
import { ProductContext, ToastContext } from "../../context/Provider/";
import { useFetch } from "../../hooks";

export default function NewProductForm({ children }) {
  const { dispatch } = useContext(ProductContext);
  const { setShowToast, setToastContent } = useContext(ToastContext);
  async function handleSubmit(e) {
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
  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="Submit">Submit</button>
    </form>
  );
}
