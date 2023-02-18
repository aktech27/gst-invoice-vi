import React from "react";
import styles from "./Product.module.css";
import { useFetch } from "../../hooks";

export default function EditModal({ data, set }) {
  return (
    <div className={`modal-container ${styles.modal}`}>
      <div className={styles.modalContent}>
        <h2>Edit Details</h2>
        <div className={styles.dataContainer}>
          <input id="name" defaultValue={data.name} />
          <input id="hsn" defaultValue={data.hsn} />
          <input id="rate" defaultValue={data.rate} />
          <input id="tax" defaultValue={data.tax} />
          <input id="group" defaultValue={data.group} />
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
  let [name, hsn, rate, tax, group] = ["name", "hsn", "rate", "tax", "group"].map(
    (id) => document.querySelector(`#${id}`).value
  );
  let details = { name, hsn, rate, tax, group };
  let { message } = await useFetch(`/api/product/edit/${id}`, "PUT", details);
  console.log(message);
}
