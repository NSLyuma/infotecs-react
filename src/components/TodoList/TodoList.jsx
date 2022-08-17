import { TodoListItem } from "../../components";

export const TodoList = ({ todoList, editTask, deleteTask }) => {
  return (
    <ol>
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
  );
};
