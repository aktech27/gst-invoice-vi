import { useEffect, useState } from "react";
import { useFetch } from "../hooks";
import BeneficiarySelect from "../components/Bill/BeneficiarySelect";
import BillInput from "../components/Bill/BillInput";
import NewBillForm from "../components/Bill/NewBillForm";
import ProductGroup from "../components/Bill/ProductGroup";
import Loading from "../components/Loading";

function NewBill() {
  const [billNumber, setBillNumber] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getBillNumber() {
      let { message } = await useFetch("/api/bill/billnumber", "GET");
      setBillNumber(message.billNo + 1);
      setLoading(false);
    }
    setLoading(true);
    getBillNumber();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h1>Generate New</h1>
      <NewBillForm setLoading={setLoading}>
        <BillInput label="Bill No" id="number" value={billNumber} />
        <BillInput
          type="date"
          label="Bill Date"
          id="date"
          value={new Date().toISOString().split("T")[0]}
        />
        <BillInput label="Vehicle No" id="vehicle" />
        <BillInput label="Our DC" id="ourdc" />
        <BillInput label="Party DC" id="partydc" />
        <BeneficiarySelect />
        <ProductGroup />
      </NewBillForm>
    </>
  );
}

export default NewBill;
