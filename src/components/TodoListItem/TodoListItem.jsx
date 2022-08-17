export const TodoListItem = ({ task, id, deleteTask }) => {
  return (
    <li>
      <div>{task}</div>
      <div onClick={() => deleteTask(id)}>X</div>
    </li>
  );
};
