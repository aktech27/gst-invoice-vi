import styles from "./Bill.module.css";

export default function DateInput({ id, label, type = "text", value = "", handleDateChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={`Enter ${id}`}
        defaultValue={value}
        onChange={(e) => handleDateChange(e)}
      />
    </div>
  );
}
