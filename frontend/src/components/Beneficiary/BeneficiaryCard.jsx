import styles from "./Beneficiary.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

function BeneficiaryCard({ details }) {
  console.log(details);
  return (
    <div className={styles.beneficiaryCard}>
      <div className={styles.beneficiaryCardAction}>
        <span className={styles.beneficiaryCardEdit}>
          <BiEdit />
        </span>
        <span className={styles.beneficiaryCardDelete}>
          <MdDeleteForever />
        </span>
      </div>
      <div className={styles.beneficiaryCardMain}>
        <h3>{details.name}</h3>
        <h4>{details.gstin}</h4>
      </div>
      <div className={styles.beneficiaryCardDetails}>
        <b>Address : </b>
        <span>
          {details.address.line3} - {details.address.pincode}
        </span>
        {details.phone && (
          <div>
            <b>Phone : </b>
            {details.phone}
          </div>
        )}
        {details.email && (
          <div>
            <b>Email : </b>
            {details.email}
          </div>
        )}
      </div>
    </div>
  );
}

export default BeneficiaryCard;
