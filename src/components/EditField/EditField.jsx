export const EditField = ({ taskValue, setTaskValue, saveTask, id }) => {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
        <button onClick={() => saveTask(id)}>Сохранить</button>
      </form>
    </div>
  );
};
