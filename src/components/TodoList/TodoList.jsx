import { TodoListItem } from "../../components";
import styles from "./TodoList.module.css";

export const TodoList = ({ todoList, editTask, deleteTask }) => {
  return (
    // <div style={{ "overflow-y": "visible" }}>
    <ol className={styles.taskList}>
      {todoList.map(({ id, task }) => {
        return (
          <TodoListItem
            key={id}
            task={task}
            id={id}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </ol>
    // </div>
  );
};
