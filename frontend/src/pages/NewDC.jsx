import { useEffect, useState, useContext } from "react";
import { useFetch } from "../hooks";
import BeneficiarySelect from "../components/Bill/BeneficiarySelect";
import BillInput from "../components/Bill/BillInput";
import NewDCForm from "../components/Bill/NewDCForm";
import ProductGroup from "../components/Bill/ProductGroup";
import { LoadingContext } from "../context/Provider/LoadingContext";

export default function NewDC() {
  const [dcNumber, setDcNumber] = useState();
  const { setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    async function getdcNumber() {
      let { message } = await useFetch("/api/dc/dcNumber", "GET");
      setDcNumber(message.dcNo + 1);
      setIsLoading(false);
    }
    setIsLoading(true);
    getdcNumber();
  }, []);

  return (
    <>
      <h1>Generate New DC</h1>
      <NewDCForm>
        <BillInput label="DC No" id="number" value={dcNumber} />
        <BillInput
          type="date"
          label="Bill Date"
          id="date"
          value={new Date().toISOString().split("T")[0]}
        />
        <BillInput label="Vehicle No" id="vehicle" />
        <BillInput label="Your DC" id="dc" />
        <BeneficiarySelect />
        <ProductGroup type="Value" />
      </NewDCForm>
    </>
  );
}
