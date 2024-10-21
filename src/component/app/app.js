import React, { useState } from 'react';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

let maxID = 100;
const arrTimerId = [];

export default function App() {

  const [taskList, setTaskList] = useState([]);
  const [filtered, setFiltered] = useState('All');

  function tick(id) {
    setTaskList((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[index];
      const newItem = {
        ...oldItem,
        launched: false,
        totalSeconds: prevTodoData[index].totalSeconds + 1000,
      };
      const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];

      return newArr;
    });
  }

  const clickTimerPlay = (id) => {
    const index = taskList.findIndex((el) => el.id === id);
    const oldItem = taskList[index];

    if (!oldItem.launched) {
      clearInterval(arrTimerId[index]);
    }

    const newItemTimerId = setInterval(() => tick(id), 1000);
    arrTimerId[index] = newItemTimerId;
  };
  
  const clickTimerPause = (id) => {
    const index = taskList.findIndex((el) => el.id === id);
    const oldItemTodoData = taskList[index];

    if (!oldItemTodoData.launched) {
      clearInterval(arrTimerId[index]);

      setTaskList((prevTodoData) => {
        const oldItem = prevTodoData[index];
        const newItem = { ...oldItem, timerStarted: false };
        const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];

        return newArr;
      });
    }
  };

  const updateFilter = (filter) => {
    setFiltered(filter);
  };

  const filterItems = (items, filter) => {
    if (filter === 'All') {
      return items;
    }
    if (filter === 'Active') {
      return items.filter((task) => !task.important);
    }
    if (filter === 'Completed') {
      return items.filter((task) => task.important);
    }
  };

  function createTodoItem(label, totalSeconds) {
    return {
      label,
      date: new Date(),
      important: false,
      id: maxID++,
      totalSeconds: totalSeconds || 0,
      launched: false,
    };
  };

  const onDeletedItem = (id) => {
    setTaskList((prevTaskList) => {
      const idx = prevTaskList.findIndex((item) => item.id === id);
      const before = prevTaskList.slice(0, idx);
      const after = prevTaskList.slice(idx + 1);
      const arr = [...before, ...after];
      const index = taskList.findIndex((el) => el.id === id);
      clearInterval(arrTimerId[index]);


      return arr;
    });
  };

  const onCheckboxClick = (id) => {
    setTaskList((prevTaskList) => {
      const newArr = prevTaskList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            important: !item.important,
          };
        }
        return item;
      });
      return newArr;
    });
  };

  const addItem = (label, totalSeconds) => {
    const newItem = createTodoItem(label, totalSeconds);
    setTaskList((prevTaskList) => [...prevTaskList, newItem]);
  };

  const clearCompleted = () => {
    setTaskList((prevTaskList) => prevTaskList.filter((item) => !item.important));
  };

  const doneCount = taskList.filter((el) => !el.important).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList todo={filterItems(taskList, filtered)}
          onDeletedItem={onDeletedItem}
          onCheckboxClick={onCheckboxClick}
          totalSeconds={0}
          clickTimerPause={clickTimerPause}
          clickTimerPlay={clickTimerPlay}
          taskList={taskList}
        />
        <Footer onClickFilter={updateFilter} 
          filter={filtered} 
          clearCompleted={clearCompleted} 
          doneCount={doneCount} />
      </section>
    </section>
  );
};
