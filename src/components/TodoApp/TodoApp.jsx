import { useState } from "react";
import { TodoList, MyForm } from "../../components";
import styles from "./TodoApp.module.css";

export const TodoApp = () => {
  //задачи подгружаются из localStorage, если их там нет, соответственно пустой массив
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );

  //инициализация пользовательского ввода
  const [userInput, setUserInput] = useState("");

  //инициализация переменных для возвращения задач и их id
  const [taskValue, setTaskValue] = useState("");
  const [taskId, setTaskId] = useState("");

  //сохранение задач в localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  //функция добавления новых задач
  const addNewTask = () => {
    //если поле ввода не пустое, задачи добавляются
    //id генерируется с помощью случайных чисел, методом toString(36) число переводится в 36-ричную систему счисления, методом substring(2, 9) обрезаются ненужные символы (0,) и сама строка
    //лишние пробелы в начале и в конце строки обрезаются с помощью .trim()
    //после добавления новой задачи поле для ввода очищается
    if (userInput) {
      setTodoList([
        ...todoList,
        {
          id: Math.random().toString(36).substring(2, 9),
          task: userInput.trim(),
        },
      ]);
      setUserInput("");
    }
  };

  //функция удаления задачи по значению id
  const deleteTask = (id) => {
    setTodoList([...todoList.filter((item) => item.id !== id)]);
  };

  //функция редактирования задачи по значению id
  const editTask = (id, task) => {
    setTaskId(id);
    setTaskValue(task);
  };

  //функция сохранения изменений в задаче
  //id задачи из списка и редактируемой сравниваются и старая задача перезаписывается, поле редактирования очищается
  const saveTask = (id) => {
    let newTask = [...todoList].map((item) => {
      if (item.id === id) {
        item.task = taskValue.trim();
      }
      return item;
    });
    setTodoList(newTask);
    setTaskValue("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.taskList}>
        {/* форма для добавления новой задачи */}
        <MyForm
          onSubmit={(e) => e.preventDefault()}
          placeholder="Введите название"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onClick={addNewTask}
          text="Добавить"
        />

        {/* список задач */}
        <TodoList
          todoList={todoList}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>

      <div className={styles.formBox}>
        {/* форма для редактирования задачи */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className={styles.input}
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
          <button onClick={() => saveTask(taskId)}>Сохранить</button>
        </form>
      </div>
    </div>
  );
};
