import { useState } from "react";
import { TodoAppPresenter } from "./TodoAppPresenter";

export const TodoApp = () => {
  //задачи подгружаются из localStorage, если их там нет, соответственно пустой массив
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );

  //инициализация пользовательского ввода для добавления задачи
  const [userInput, setUserInput] = useState("");

  //инициализация переменных для возвращения задач и их id
  const [taskValue, setTaskValue] = useState("");
  const [taskId, setTaskId] = useState("");

  //инициализация вводимого значения в поиске
  const [searchValue, setSearchValue] = useState("");

  //инициализация статуса и цвета подсказок
  const [taskStatus, setTaskStatus] = useState("Ожидает");
  const [taskColor, setTaskColor] = useState("grey");

  //сохранение задач в localStorage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  //функция добавления новых задач
  const addNewTask = () => {
    //если поле ввода не пустое, задачи добавляются
    //id генерируется с помощью случайных чисел, методом toString(36) число переводится в 36-ричную систему счисления, методом substring(2, 9) обрезаются ненужные символы (0,) и сама строка
    //лишние пробелы в начале и в конце строки обрезаются с помощью .trim()
    //для всех новых задач значения переменных status и color равны taskStatus и taskColor соответственно, т. к. в дальнейшем они будут изменяться
    //после добавления новой задачи поле для ввода очищается
    if (userInput) {
      setTodoList([
        ...todoList,
        {
          id: Math.random().toString(36).substring(2, 9),
          task: userInput.trim(),
          status: taskStatus,
          color: taskColor,
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
    //фокусировка поля для редактирования
    const editArea = document.getElementById("editArea");
    editArea.focus();

    //в поле редактирования передается задача и ее id
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
    const main = document.getElementById("main"); //родительский элемент

    //расположение blockResize поверх всех элементов и присваивание ему высоты родительского элемента (-1 из-за рамки)
    blockResize.style.position = "absolute";
    blockResize.style.zIndex = "100";
    blockResize.style.height = main.offsetHeight - 1 + "px";

    const space = main.getBoundingClientRect().x; //расстояние от левого блока-родителя до левого края окна браузера
    const spaceRight = space + main.offsetWidth - 20; //расстояние от правого блока-родителя до левого края окна браузера

    //функция передвижения blockResize на пользовательские координаты
    const moveAt = (pageX) => {
      //условие, необходимое, чтобы blockResize не перемещался за края родительского элемента
      if (
        pageX - blockResize.offsetWidth / 2 >= space &&
        pageX - blockResize.offsetWidth / 2 <= spaceRight
      ) {
        blockResize.style.left = pageX - blockResize.offsetWidth / 2 + "px";
        //изменение ширины блоков вокруг blockResize, чтобы они не схлопывались за ним
        block1.style.width = pageX - space - blockResize.offsetWidth / 2 + "px";
        block2.style.width =
          window.innerWidth -
          pageX -
          space -
          blockResize.offsetWidth / 2 +
          "px";
      }
    };

    //необходимо для того, чтобы blockResize сразу оказался под мышью
    moveAt(event.pageX);

    //перемещение blockResize по пользовательским координатам при движении мыши
    //изменение ширины списка задач и блока редактирования
    const onMouseMove = (event) => {
      if (
        event.pageX - blockResize.offsetWidth / 2 >= space &&
        event.pageX - blockResize.offsetWidth / 2 <= spaceRight
      ) {
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
      }
    };

    //обработчик события на движение мыши
    document.addEventListener("mousemove", onMouseMove);

    //функция на отпускание кнопки мыши
    //сбрасывается текущий обработчик и обработчик события на движение мыши
    //для того, чтобы если курсор уйдёт с blockResize, он перестал двигаться, когда мышь не нажата
    const onMouseUp = () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };

    //обработчик события на отпускание кнопки мыши
    document.addEventListener("mouseup", onMouseUp);
  };

  //функция изменения статуса и цвета задачи при событии onMouseDown
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

  //функция перезаписи статуса и цвета задачи при событии onMouseUp
  //статус и цвет сбрасываются, чтобы у новых задач был первоначальный статус
  const updateTaskStatus = (id) => {
    let newStatusTask = [...todoList].map((item) => {
      if (item.id === id) {
        item.status = taskStatus;
        item.color = taskColor;
      }
      return item;
    });
    setTodoList(newStatusTask);
    setTaskStatus("Ожидает");
    setTaskColor("grey");
  };

  //список фильтрованных задач при поиске
  const filteredTasks = todoList.filter((item) =>
    item.task.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <TodoAppPresenter
        userInput={userInput}
        setUserInput={setUserInput}
        addNewTask={addNewTask}
        setSearchValue={setSearchValue}
        todoList={filteredTasks}
        editTask={editTask}
        deleteTask={deleteTask}
        changeIndication={changeIndication}
        updateTaskStatus={updateTaskStatus}
        resizeBlock={resizeBlock}
        taskValue={taskValue}
        setTaskValue={setTaskValue}
        saveTask={saveTask}
        taskId={taskId}
      />
    </>
  );
};
