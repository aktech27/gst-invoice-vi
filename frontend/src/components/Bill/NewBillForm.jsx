import styles from "./Bill.module.css";
import { useFetch } from "../../../hooks";
import newBill from "../../assets/newbill.png";

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
      <img src={newBill} alt="Bill" />
      <Fieldset group="Bill Details" nodes={children.slice(0, 5)} />
      <Fieldset group="Beneficiary Details" nodes={children.slice(5, 6)} />
      <Fieldset group="Product Details" nodes={children.slice(6)} className={styles.product} />
      <button type="submit">Submit</button>
    </form>
  );
}

async function handleFormSubmit(e) {
  e.preventDefault();
  let [number, date, to, vehicle, ourdc, partydc] = [
    "number",
    "date",
    "to",
    "vehicle",
    "ourdc",
    "partydc",
  ].map((id) => document.querySelector(`#${id}`).value);
  let productList = document.querySelectorAll("#product-list div");
  console.log(productList);

  let products = new Array();

  for (let i = 0; i < productList.length; i++) {
    const productDetail = new Object();
    productDetail.item = productList[i].childNodes[0].value;
    productDetail.quantity = productList[i].childNodes[1].value;
    productDetail.rate = productList[i].childNodes[2].value;

    products.push(productDetail);
  }

  let billDetails = {
    number: parseInt(number),
    date: new Date(date),
    to,
    vehicle,
    products,
    dc: {
      ours: ourdc,
      party: partydc,
    },
  };
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
