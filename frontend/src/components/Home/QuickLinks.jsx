import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import bill from "../../assets/newbill.png";
import product from "../../assets/newproduct.png";
import user from "../../assets/newuser.png";

function LinkCard({ href, name, img, delay }) {
  return (
    <Link className={`bounce-in-right ${delay} ${styles.linkContainer}`} to={href}>
      <div>{name}</div>
      <img src={img} alt={name} />
    </Link>
  );
}

function QuickLinks() {
  return (
    <div className={styles.quickLinks}>
      <LinkCard href="/bill/new" name="Generate Invoice" img={bill} />
      <LinkCard href="/beneficiary" name="Manage Beneficiary" img={user} delay="delay-1" />
      <LinkCard href="/product" name="Manage Products" img={product} delay="delay-2" />
    </div>
  );
}

export default QuickLinks;
