import React from 'react';

import Task from '../task/task';

export default function TaskList({ todo, onDeletedItem, onCheckboxClick, clickTimerPause, 
  clickTimerPlay, taskList }) {

  const taskElement = todo.map((item) => {
    const { id, important, totalSeconds } = item;

    let classNames = '';
    if (important) {
      classNames += ' completed';
    }

    return (
      <li key={id} className={classNames}>
        <Task {...item} onDeletedItem={() => onDeletedItem(id)} 
          onCheckboxClick={() => onCheckboxClick(id)}
          clickTimerPause={() => clickTimerPause(id)}
          clickTimerPlay={() => clickTimerPlay(id)}
          totalSeconds={totalSeconds}
          id={id}
          taskList={taskList} />
      </li>
    );
  });

  return <ul className="todo-list">{taskElement}</ul>;
}