import { TodoListItem } from "../../components";

export const TodoList = ({ todoList, deleteTask }) => {
  return (
    <ul>
      {todoList.map(({ id, task }) => {
        return (
          <TodoListItem key={id} task={task} id={id} deleteTask={deleteTask} />
        );
      })}
    </ul>
  );
};
