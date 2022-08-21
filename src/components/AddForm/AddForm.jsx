import styles from "./AddForm.module.css";

export const AddForm = ({ placeholder, value, onChange, onClick, text }) => {
  return (
    <form className={styles.addForm} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.addFormInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button className={styles.addFormButton} onClick={onClick}>
        {text}
      </button>
    </form>
  );
};
