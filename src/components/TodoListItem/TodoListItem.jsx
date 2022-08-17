import styles from "./TodoListItem.module.css";

export const TodoListItem = ({ task, id, editTask, deleteTask }) => {
  return (
    <li>
      <p className={styles.task}>{task}</p>
      <button onClick={() => editTask(id, task)}>Редактировать</button>
      <button onClick={() => deleteTask(id)}>Удалить</button>
    </li>
  );
};
