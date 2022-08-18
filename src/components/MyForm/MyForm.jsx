import styles from "./MyForm.module.css";

export const MyForm = ({
  onSubmit,
  placeholder,
  value,
  onChange,
  onClick,
  text,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input placeholder={placeholder} value={value} onChange={onChange} />
      <button onClick={onClick}>{text}</button>
    </form>
  );
};
