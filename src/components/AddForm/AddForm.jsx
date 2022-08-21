import styles from "./AddForm.module.css";

export const AddForm = ({ placeholder, value, onChange, onClick, text }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input placeholder={placeholder} value={value} onChange={onChange} />
      <button onClick={onClick}>{text}</button>
    </form>
  );
};
