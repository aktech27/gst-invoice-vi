function ProductRow({ product, index, action }) {
  return (
    <>
      <tr onClick={() => action(product)}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.hsn}</td>
        <td>{product.rate}</td>
        <td>{product.tax}</td>
        <td>{product.group}</td>
      </tr>
    </>
  );
}

export default ProductRow;
