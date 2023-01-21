import styles from "./Beneficiary.module.css";

function BeneficiaryInput({ id, label }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} placeholder={`Enter ${id}`} />
    </div>
  );
}

export default BeneficiaryInput;
