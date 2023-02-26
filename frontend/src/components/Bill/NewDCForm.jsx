import styles from "./Bill.module.css";
import { useFetch } from "../../hooks";
import newBill from "../../assets/newbill.png";
import { useContext } from "react";
import { LoadingContext } from "../../context/Provider/LoadingContext";
import { ToastContext } from "../../context/Provider/ToastContext";

function Fieldset({ group, nodes, className }) {
  return (
    <fieldset className={className}>
      <legend>{group}</legend>
      {nodes}
    </fieldset>
  );
}

export default function NewDCForm({ children }) {
  const { setIsLoading } = useContext(LoadingContext);
  const { setShowToast, setToastContent } = useContext(ToastContext);
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let [number, date, to, vehicle, dc] = ["number", "date", "to", "vehicle", "dc"].map(
      (id) => document.querySelector(`#${id}`).value
    );
    let productList = document.querySelectorAll("#product-list div");
    console.log(productList);

    let products = new Array();

    for (let i = 0; i < productList.length; i++) {
      const productDetail = new Object();
      productDetail.item = productList[i].childNodes[0].value;
      productDetail.quantity = productList[i].childNodes[1].value;
      productDetail.value = productList[i].childNodes[2].value;

      products.push(productDetail);
    }

    let dcDetails = {
      number: parseInt(number),
      date: new Date(date),
      to,
      vehicle,
      products,
      dc,
    };
    console.log(dcDetails);
    let res = await useFetch("/api/dc/new", "POST", dcDetails);
    let blob = await fetch(`/api/dc/download/${res.message.data._id}`, {
      method: "GET",
    }).then((res) => res.blob());
    setIsLoading(false);
    setToastContent({ message: "DC Generated.Downloading...", type: "success" });
    setShowToast(true);
    let alink = document.createElement("a");
    alink.href = window.URL.createObjectURL(blob);
    alink.download = `DC-${res.message.data.number.toString().padStart(3, "0")}.pdf`;
    alink.click();
  }
  //children is array of BenenificiaryInput components
  return (
    <form className={styles.addForm} onSubmit={handleFormSubmit}>
      <img src={newBill} alt="DC" />
      <Fieldset group="Bill Details" nodes={children.slice(0, 4)} />
      <Fieldset group="Beneficiary Details" nodes={children.slice(4, 5)} />
      <Fieldset group="Product Details" nodes={children.slice(5)} className={styles.product} />
      <button type="submit">Submit</button>
    </form>
  );
}
