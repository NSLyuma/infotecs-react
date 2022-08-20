import styles from "./TodoListItem.module.css";

export const TodoListItem = ({ task, id, editTask, deleteTask }) => {
  return (
    <li className={styles.taskLi}>
      <div className={styles.taskBox}>
        <div className={styles.taskItem}>{task}</div>
        <button
          className={styles.taskButton}
          onClick={() => editTask(id, task)}
        >
          Редактировать
        </button>
        <button className={styles.taskButton} onClick={() => deleteTask(id)}>
          Удалить
        </button>
      </div>
    </li>
  );
};
