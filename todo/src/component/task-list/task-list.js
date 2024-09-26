import React from 'react';

import Task from '../task/task';

const TaskList = ({ todo, onDeletedItem, onCheckboxClick }) => {
  const taskElement = todo.map((item) => {
    const { id, important } = item;

    let classNames = '';
    if (important) {
      classNames += ' completed';
    }

    return (
      <li key={id} className={classNames}>
        <Task {...item} onDeletedItem={() => onDeletedItem(id)} onCheckboxClick={() => onCheckboxClick(id)} />
      </li>
    );
  });

  return <ul className="todo-list">{taskElement}</ul>;
};

export default TaskList;
