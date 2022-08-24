import styles from "./TodoListItem.module.css";

export const TodoListItem = ({
  task,
  id,
  status,
  color,
  editTask,
  deleteTask,
  changeIndication,
  updateTaskStatus,
}) => {
  return (
    <li className={styles.taskLi}>
      <div className={styles.taskBox}>
        <div className={styles.taskTitle}>
          <div
            id={id}
            style={{ color: `${color}` }}
            className={styles.taskItem}
            onMouseDown={() => changeIndication(status)}
            onMouseUp={() => updateTaskStatus(id)}
          >
            {task}
            <div className={styles.tooltip}>{status}</div>
          </div>
        </div>

        <div className={styles.taskButtonBox}>
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
      </div>
    </li>
  );
};
