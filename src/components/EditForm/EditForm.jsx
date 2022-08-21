import styles from "./EditForm.module.css";

export const EditForm = ({ id, taskValue, setTaskValue, saveTask, taskId }) => {
  return (
    <form className={styles.editForm} onSubmit={(e) => e.preventDefault()}>
      <textarea
        id={id}
        className={styles.editInput}
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <button className={styles.editButton} onClick={() => saveTask(taskId)}>
        Сохранить
      </button>
    </form>
  );
};
