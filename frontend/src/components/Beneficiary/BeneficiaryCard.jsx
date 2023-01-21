import styles from "./Beneficiary.module.css";

function BeneficiaryCard({ details }) {
  return (
    <div className={styles.beneficiaryCard}>
      <h3>{details.name}</h3>
      <h4>{details.gstin}</h4>
      <div>{details.phone}</div>
      <div>{details.email}</div>
    </div>
  );
}

export default BeneficiaryCard;
