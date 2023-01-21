import styles from "./Bill.module.css";

function BillInput({ id, label, type = "text" }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={`Enter ${id}`} />
    </div>
  );
}

export default BillInput;
