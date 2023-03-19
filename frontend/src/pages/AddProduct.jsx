import NewProductForm from "../components/Product/NewProductForm";
import ProductInput from "../components/Product/ProductInput";
import ProductSelect from "../components/Product/ProductSelect";

export default function AddProduct() {
  return (
    <>
      <h1>Add Product</h1>
      <NewProductForm>
        <ProductInput id="name" label="Product Name" />
        <ProductInput id="hsn" label="HSN" />
        <ProductSelect
          id="group"
          label="Group"
          defaultValue="General"
          options={[
            { name: "General", value: "General" },
            { name: "Techno", value: "Techno" },
            { name: "DC", value: "DC" },
          ]}
        />
        <ProductSelect
          id="tax"
          label="Tax Percent"
          defaultValue={9}
          options={[
            { name: "2.5+2.5", value: 2.5 },
            { name: "6+6", value: 6 },
            { name: "9+9", value: 9 },
            { name: "14+14", value: 14 },
          ]}
        />
        <ProductInput id="rate" label="Rate" />
      </NewProductForm>
    </>
  );
}
