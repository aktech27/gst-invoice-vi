export default function ProductSelect({ id, label, defaultValue, options }) {
  return (
    <label htmlFor={id}>
      {label}
      <select name={id} id={id} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}
