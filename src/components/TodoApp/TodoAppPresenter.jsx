import { TodoList, AddForm, EditForm } from "..";
import styles from "./TodoApp.module.css";

export const TodoAppPresenter = ({
  userInput,
  setUserInput,
  addNewTask,
  setSearchValue,
  editTask,
  deleteTask,
  changeIndication,
  updateTaskStatus,
  resizeBlock,
  taskValue,
  setTaskValue,
  saveTask,
  taskId,
  todoList,
}) => {
  return (
    <div id="main" className={styles.main}>
      <div id="block1" className={styles.block1}>
        <div className={styles.taskListBox}>
          {/* форма для добавления новой задачи */}
          <AddForm
            placeholder="Введите название"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onClick={addNewTask}
            text="Добавить"
          />

          {/* поле для поиска задачи по названию */}
          <input
            placeholder="Поиск..."
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {/* список задач */}
          <h3>Список задач</h3>
          <TodoList
            todoList={todoList}
            editTask={editTask}
            deleteTask={deleteTask}
            changeIndication={changeIndication}
            updateTaskStatus={updateTaskStatus}
          />
        </div>

        {/* блок для реализации изменения ширины списка задач */}
        <div
          onMouseDown={resizeBlock}
          className={styles.blockResize}
          id="blockResize"
        ></div>
      </div>

      <div id="block2">
        {/* форма для редактирования задачи */}
        <EditForm
          id="editArea"
          taskValue={taskValue}
          setTaskValue={setTaskValue}
          saveTask={saveTask}
          taskId={taskId}
        />
      </div>
    </div>
  );
};
