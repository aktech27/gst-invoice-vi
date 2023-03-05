import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Beneficiary,
  NewBill,
  AddBeneficiary,
  Products,
  AddProduct,
  NewDC,
  Invoice,
} from "./pages";
import Navbar from "./components/Home/Navbar";
import Loading from "./components/Loading";
import { useContext } from "react";
import { LoadingContext } from "./context/Provider/LoadingContext";
import { ToastContext } from "./context/Provider/ToastContext";
import Toast from "./components/Toast";

function App() {
  const { isLoading } = useContext(LoadingContext);
  const { showToast, toastContent } = useContext(ToastContext);
  return (
    <>
      {isLoading && <Loading />}
      {showToast && <Toast message={toastContent.message} type={toastContent.type} />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beneficiary" element={<Beneficiary />} />
          <Route path="/invoice/" element={<Invoice />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route exact path="/beneficiary/add" element={<AddBeneficiary />} />
          <Route exact path="/bill/new" element={<NewBill />} />
          <Route exact path="/dc/new" element={<NewDC />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
