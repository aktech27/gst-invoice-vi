import React from "react";
import styles from "./Beneficiary.module.css";
import useFetch from "../../hooks/useFetch";

export default function EditModal({ data, set }) {
  return (
    <div className={`modal-container ${styles.modal}`}>
      <div className={styles.modalContent}>
        <h2>Edit Details</h2>
        <div className={styles.dataContainer}>
          <input id="name" defaultValue={data.name} />
          <input id="gstin" defaultValue={data.gstin} />
          <input id="phone" defaultValue={data.phone} />
          <input id="email" defaultValue={data.email} />
          <input id="address1" defaultValue={data.address.line1} />
          <input id="address2" defaultValue={data.address.line2} />
          <input id="address3" defaultValue={data.address.line3} />
          <input id="pincode" defaultValue={data.address.pincode} />
        </div>
        <button
          type="submit"
          onClick={() => {
            set(false);
            handleSave(data._id);
          }}
        >
          Save
        </button>
        <button type="button" className={styles.modalCancel} onClick={() => set(false)}>
          X
        </button>
      </div>
    </div>
  );
}

async function handleSave(id) {
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
  let response = await useFetch(`/api/beneficiary/edit/${id}`, "PUT", details);
  console.log(response);
}
