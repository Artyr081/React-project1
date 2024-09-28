import React, { Component } from 'react';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

export default class App extends Component {
  maxID = 0;

  state = {
    taskList: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'All',
  };

  updateFilter = (filter) => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    if (filter === 'All') {
      return items;
    }
    if (filter === 'Active') {
      return items.filter((task) => !task.important);
    }
    if (filter === 'Completed') {
      return items.filter((task) => task.important);
    }
  }

  createTodoItem(label) {
    return {
      label,
      date: new Date(),
      important: false,
      id: this.maxID++,
    };
  }

  ondeleteditem = (id) => {
    this.setState(({ taskList }) => {
      const idx = taskList.findIndex((item) => item.id === id);
      const before = taskList.slice(0, idx);
      const after = taskList.slice(idx + 1);
      const arr = [...before, ...after];

      return {
        taskList: arr,
      };
    });
  };

  oncheckboxclick = (id) => {
    this.setState(({ taskList }) => {
      const newArr = taskList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            important: !item.important,
          };
        }
        return item;
      });
      return {
        taskList: newArr,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ taskList }) => {
      const newArr = [...taskList, newItem];

      return {
        taskList: newArr,
      };
    });
  };

  clearcompleted = () => {
    this.setState(({ taskList }) => {
      const idx = taskList.filter((item) => item.important === false);
      const arr = [...idx];
      return {
        taskList: arr,
      };
    });
  };

  render() {
    const { filter, taskList } = this.state;
    const visibleItems = this.filterItems(taskList, filter);

    const doneCount = this.state.taskList.filter((el) => el.important === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList todo={visibleItems} onDeletedItem={this.ondeleteditem} onCheckboxClick={this.oncheckboxclick} />
          <Footer
            onClickFilter={this.updateFilter}
            filter={filter}
            clearcompleted={this.clearcompleted}
            doneCount={doneCount}
          />
        </section>
      </section>
    );
  }
}
