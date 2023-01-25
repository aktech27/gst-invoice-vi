import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Beneficiary, NewBill, AddBeneficiary, Products, AddProduct } from "./pages";
import Navbar from "./components/Home/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beneficiary" element={<Beneficiary />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route exact path="/beneficiary/add" element={<AddBeneficiary />} />
        <Route exact path="/bill/new" element={<NewBill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
