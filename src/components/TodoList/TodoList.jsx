import { TodoListItem } from "../../components";
import styles from "./TodoList.module.css";

export const TodoList = ({
  todoList,
  editTask,
  deleteTask,
  changeIndication,
  updateTaskStatus,
}) => {
  return (
    <ol className={styles.taskList}>
      {todoList.map(({ id, task, status, color }) => {
        return (
          <TodoListItem
            key={id}
            task={task}
            id={id}
            status={status}
            color={color}
            editTask={editTask}
            deleteTask={deleteTask}
            changeIndication={changeIndication}
            updateTaskStatus={updateTaskStatus}
          />
        );
      })}
    </ol>
  );
};
