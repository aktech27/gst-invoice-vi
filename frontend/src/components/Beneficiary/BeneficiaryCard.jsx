import styles from "./Beneficiary.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import EditModal from "./EditModal";
import { useState } from "react";
import { useFetch } from "../../hooks";

function BeneficiaryCard({ details }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <EditModal data={details} set={setShowModal} />}
      <div className={styles.beneficiaryCard}>
        <div className={styles.beneficiaryCardAction}>
          <span
            className={styles.beneficiaryCardEdit}
            onClick={() => {
              window.scrollTo(0, 0);
              setShowModal((prev) => !prev);
            }}
          >
            <BiEdit />
          </span>
          <span
            className={styles.beneficiaryCardDelete}
            onClick={async () => {
              let response = await useFetch(`/api/beneficiary/delete/${details._id}`, "DELETE");
              console.log(response);
              window.location.reload();
            }}
          >
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
    </>
  );
}

export default BeneficiaryCard;
