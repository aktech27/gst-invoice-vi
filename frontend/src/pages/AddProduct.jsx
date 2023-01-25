import { useFetch } from "../../hooks";

function AddProduct() {
  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input id="name" placeholder="Name" />
        <input id="group" placeholder="Group" defaultValue="General" />
        <input id="hsn" placeholder="HSN" />
        <select name="tax" id="tax" defaultValue={9}>
          <option value={2.5}>2.5+2.5</option>
          <option value={6}>6+6</option>
          <option value={9}>9+9</option>
          <option value={14}>14+14</option>
        </select>
        <input id="rate" placeholder="Rate" />
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  let [name, group, hsn, tax, rate] = ["name", "group", "hsn", "tax", "rate"].map(
    (id) => document.querySelector(`#${id}`).value
  );
  let details = { name, group, hsn: parseInt(hsn), tax, rate: parseFloat(rate) };
  await useFetch("/api/product/new", "POST", details);
}

export default AddProduct;
