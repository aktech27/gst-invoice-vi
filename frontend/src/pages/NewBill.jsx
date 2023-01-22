import BeneficiarySelect from "../components/Bill/BeneficiarySelect";
import BillInput from "../components/Bill/BillInput";
import NewBillForm from "../components/Bill/NewBillForm";
import ProductGroup from "../components/Bill/ProductGroup";

function NewBill() {
  return (
    <>
      <h1>Generate New</h1>
      <NewBillForm>
        <BillInput label="Bill No" id="number" />
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
