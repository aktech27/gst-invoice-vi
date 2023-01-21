import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Victory Industries</h1>
      <Link to="/beneficiary">Manage Beneficiary</Link>
      <Link to="/bill/new">Generate Invoice</Link>
      <Link to="/beneficiary">View Beneficiary</Link>
    </>
  );
}

export default Home;
