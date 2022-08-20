import { useState } from "react";
import styles from "./TodoListItem.module.css";

export const TodoListItem = ({ task, id, editTask, deleteTask }) => {
  //инициализация счётчика и подсказок
  const [count, setCount] = useState(1);
  const [tooltipText, setTooltipText] = useState("Ожидает");

  //функция цветовой индикации состояния задач
  const changeIndication = () => {
    const item = document.getElementById(id);

    if (count === 1) {
      item.style.color = "blue";
      setTooltipText("В процессе");
      setCount(2);
    } else if (count === 2) {
      item.style.color = "green";
      setTooltipText("Выполнена");
      setCount(3);
    } else {
      item.style.color = "black";
      setTooltipText("Ожидает");
      setCount(1);
    }
  };
  return (
    <li className={styles.taskLi}>
      <div className={styles.taskBox}>
        <div id={id} className={styles.taskItem} onClick={changeIndication}>
          {task}
          <div className={styles.tooltip}>{tooltipText}</div>
        </div>
        <button
          className={styles.taskButton}
          onClick={() => editTask(id, task)}
        >
          Редактировать
        </button>
        <button className={styles.taskButton} onClick={() => deleteTask(id)}>
          Удалить
        </button>
      </div>
    </li>
  );
};
