import React from 'react';

function TaskFilter({ onClickFilter, filter }) {
  TaskFilter.defaultProps = {
    filter: 'All',
    onClickFilter: () => {},
  };

  const buttons = [
    { name: 'All', label: 'All' },
    { name: 'Active', label: 'Active' },
    { name: 'Completed', label: 'Completed' },
  ];

  const filters = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button className={clazz} onClick={() => onClickFilter(name)} type="button">
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filters}</ul>;
}

export default TaskFilter;
