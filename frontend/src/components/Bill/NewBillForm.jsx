import styles from "./Bill.module.css";
import { useFetch } from "../../../hooks";

function Fieldset({ group, nodes, className }) {
  return (
    <fieldset className={className}>
      <legend>{group}</legend>
      {nodes}
    </fieldset>
  );
}

function NewBillForm({ children }) {
  //children is array of BenenificiaryInput components
  return (
    <form className={styles.addForm} onSubmit={handleFormSubmit}>
      <Fieldset group="Bill Details" nodes={children.slice(0, 3)} />
      <Fieldset group="Beneficiary Details" nodes={children.slice(3, 4)} />
      <Fieldset group="Product Details" nodes={children.slice(4)} />
      <button type="submit">Submit</button>
    </form>
  );
}

async function handleFormSubmit(e) {
  e.preventDefault();
  let [number, date, to, vehicle] = ["number", "date", "to", "vehicle"].map(
    (id) => document.querySelector(`#${id}`).value
  );
  let productList = document.querySelector("#product-list");

  let products = new Array();

  for (let i = 0; i < productList.childNodes.length; i += 3) {
    const productDetail = new Object();
    productDetail.item = productList.childNodes[i].value;
    productDetail.quantity = productList.childNodes[i + 1].value;
    productDetail.rate = productList.childNodes[i + 2].value;

    products.push(productDetail);
  }

  let billDetails = { number: parseInt(number), date: new Date(date), to, vehicle, products };
  let res = await useFetch("/api/bill/new", "POST", billDetails);
  let blob = await fetch(`/api/bill/download/${res.message.data._id}`, {
    method: "GET",
  }).then((res) => res.blob());
  let alink = document.createElement("a");
  alink.href = window.URL.createObjectURL(blob);
  alink.download = `Invoice-${res.message.data.number.toString().padStart(3, "0")}.pdf`;
  alink.click();
}
export default NewBillForm;
