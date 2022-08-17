import { useState } from "react";
import { TodoList } from "../../components";

export const AddTodo = () => {
  //задачи подгружаются из localStorage, если их нет, соответственно пустой массив
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );

  //инициализация пользовательского ввода
  const [userInput, setUserInput] = useState("");

  //сохранение задач в localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  //функция добавления новых задач
  const addNewTask = () => {
    //если поле ввода не пустое, задачи добавляются
    //id генерируется с помощью случайных чисел, методом toString(36) число переводится в 36-ричную систему счисления, методом substring(2, 9) обрезаются ненужные символы (0,) и сама строка
    //после добавления новой задачи поле для ввода очищается
    if (userInput) {
      setTodoList([
        ...todoList,
        { id: Math.random().toString(36).substring(2, 9), task: userInput },
      ]);
      setUserInput("");
    }
  };

  //функция удаления задачи по значению id
  const deleteTask = (id) => {
    setTodoList([...todoList.filter((item) => item.id != id)]);
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Введите название"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={addNewTask}>Добавить</button>
      </form>
      <TodoList todoList={todoList} deleteTask={deleteTask} />
    </div>
  );
};
