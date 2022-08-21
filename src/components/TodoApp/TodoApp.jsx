import { useState } from "react";
import { TodoList, AddForm } from "../../components";
import { EditForm } from "../EditForm/EditForm";
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

  //инициализация вводимого значения в поиске
  const [searchValue, setSearchValue] = useState("");

  //инициализация счётчика и подсказок
  const [count, setCount] = useState(1);
  const [taskStatus, setTaskStatus] = useState("Ожидает");
  const [taskColor, setTaskColor] = useState("grey");

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
          status: "Ожидает",
          color: "grey",
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
    //здесь же фокусирую поле для редактирования
    const editArea = document.getElementById("editArea");
    editArea.focus();

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

  //функция изменения ширины списка задач
  const resizeBlock = (event) => {
    const blockResize = document.getElementById("blockResize"); //элемент, который меняет ширину списка
    const block1 = document.getElementById("block1"); //элемент 1, у которого меняется ширина
    const block2 = document.getElementById("block2"); //элемент 2, у которого меняется ширина
    const main = document.getElementById("main");

    //расположение blockResize поверх всех элементов и присваивание ему высоты block1 + 1 (т. к. родительский элемент больше на 1px)
    blockResize.style.position = "absolute";
    blockResize.style.zIndex = "100";
    blockResize.style.height = block1.offsetHeight + 1 + "px";

    //расстояние от блока-родителя до края окна браузера
    const space = main.getBoundingClientRect().x;

    //функция передвижения blockResize на пользовательские координаты
    const moveAt = (pageX) => {
      blockResize.style.left = pageX - blockResize.offsetWidth / 2 + "px";
      //добавление стилей для блоков вокруг blockResize, чтобы они не схлопывались за ним
      block1.style.width = pageX - space - blockResize.offsetWidth / 2 + "px";
      block2.style.width =
        window.innerWidth - pageX - space - blockResize.offsetWidth / 2 + "px";
    };

    //необходимо для того, чтобы blockResize сразу оказался под мышью
    moveAt(event.pageX);

    //перемещение blockResize по пользовательским координатам при движении мыши
    //изменение ширины списка задач
    const onMouseMove = (event) => {
      moveAt(event.pageX);

      block1.style.width =
        event.pageX - space - blockResize.offsetWidth / 2 + "px";

      block2.style.width =
        window.innerWidth -
        event.pageX -
        space -
        blockResize.offsetWidth / 2 +
        "px";

      block2.style.marginLeft = "18px";
    };

    //обработчик события на движение мыши
    document.addEventListener("mousemove", onMouseMove);

    //при отжатии мыши обработчик события на её движения сбрасывается
    //затем blockResize.onmouseup очищается
    //список задач снова с одним классом
    blockResize.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      blockResize.onmouseup = null;
    };
  };

  //функция цветовой индикации состояния задач
  const changeIndication = (status) => {
    if (status === "Ожидает") {
      setTaskStatus("В процессе");
      setTaskColor("blue");
    } else if (status === "В процессе") {
      setTaskStatus("Выполнена");
      setTaskColor("green");
    } else {
      setTaskStatus("Ожидает");
      setTaskColor("grey");
    }
  };

  const updateTaskStatus = (id) => {
    let newStatusTask = [...todoList].map((item) => {
      if (item.id === id) {
        item.status = taskStatus;
        item.color = taskColor;
      }
      return item;
    });
    setTodoList(newStatusTask);
  };

  const filteredTasks = todoList.filter((item) =>
    item.task.toLowerCase().includes(searchValue.toLowerCase())
  );
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
          <TodoList
            todoList={filteredTasks}
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
