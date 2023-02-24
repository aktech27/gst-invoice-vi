export default function Toast({ message, type }) {
  return (
    <div className={`toast-container ${type}`}>
      <div className="toast-content">
        <button type="button">x</button>
        {message}
      </div>
    </div>
  );
}
