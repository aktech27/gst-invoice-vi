export default function ProductInput({ id, label }) {
  return (
    <label htmlFor={id}>
      {label}
      <input id={id} placeholder={id.toUpperCase()} />
    </label>
  );
}
