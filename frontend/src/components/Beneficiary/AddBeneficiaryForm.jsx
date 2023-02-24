import { useContext } from "react";
import { BeneficiaryContext } from "../../context/Provider/BeneficiaryContext";
import styles from "./Beneficiary.module.css";
import { useFetch } from "../../hooks";
import { ToastContext } from "../../context/Provider/ToastContext";

function Fieldset({ group, nodes }) {
  return (
    <fieldset>
      <legend>{group}</legend>
      {nodes}
    </fieldset>
  );
}

function AddBeneficiaryForm({ children }) {
  const { dispatch } = useContext(BeneficiaryContext);
  const { setShowToast, setToastContent } = useContext(ToastContext);
  async function handleFormSubmit(e) {
    e.preventDefault();
    let [gstin, name, phone, email, line1, line2, line3, pincode] = [
      "gstin",
      "name",
      "phone",
      "email",
      "address1",
      "address2",
      "address3",
      "pincode",
    ].map((id) => document.querySelector(`#${id}`).value);
    let details = { gstin, name, phone, email, address: { line1, line2, line3, pincode } };
    let response = await useFetch("/api/beneficiary/new", "POST", details);
    dispatch({ type: "ADD", payload: response.message.newBeneficiary });
    setToastContent({ message: response.message.message, type: "success" });
    setShowToast(true);
  }
  //children is array of BenenificiaryInput components
  return (
    <form className={styles.addForm} onSubmit={handleFormSubmit}>
      <Fieldset group="Business Details" nodes={children.slice(0, 2)} />
      <Fieldset group="Contact Details" nodes={children.slice(2, 4)} />
      <Fieldset group="Location Details" nodes={children.slice(4)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddBeneficiaryForm;
