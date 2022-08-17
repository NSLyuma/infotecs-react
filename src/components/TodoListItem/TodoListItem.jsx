export const TodoListItem = ({ task, id, editTask, deleteTask }) => {
  return (
    <li>
      <div>{task}</div>
      <button onClick={() => editTask(id, task)}>Редактировать</button>
      <button onClick={() => deleteTask(id)}>Удалить</button>
    </li>
  );
};
