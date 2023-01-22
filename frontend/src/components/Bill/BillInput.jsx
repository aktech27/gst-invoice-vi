import styles from "./Bill.module.css";

function BillInput({ id, label, type = "text", value = "" }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={`Enter ${id}`} defaultValue={value} />
    </div>
  );
}

export default BillInput;
