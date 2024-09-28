import React from 'react';

import TaskFilter from '../tasks-filter/index';

function Footer({ onClickFilter, filter, clearcompleted, doneCount }) {
  Footer.defaultProps = {
    doneCount: 0,
    onClickFilter: () => {},
    clearcompleted: () => {},
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {doneCount} items left
      </span>
      <TaskFilter onClickFilter={onClickFilter} filter={filter} />
      <button className="clear-completed" onClick={clearcompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
