import styles from "./Navbar.module.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={styles.navlinks}>
        <Link to="/">Home</Link>
        <Link to="/beneficiary">Beneficiary</Link>
        <Link to="/product">Product</Link>
        <Link to="/bill/new">Invoice</Link>
      </div>
    </nav>
  );
}

export default Navbar;
