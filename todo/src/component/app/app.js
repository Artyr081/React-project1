import React, { Component } from 'react';
import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';


export default class App extends Component {

  state = {
    taskList: [
      {label: 'Completed task', id: 1, important: false},
      {label: 'Editing task', id: 2, important: false},
      {label: 'Active task', id: 3, important: false},
    ]
  }

  ondeleteditem = (id) => {
    this.setState(({ taskList}) => {

      const idx = taskList.findIndex((item) => item.id === id);
      const before = taskList.slice(0, idx);
      const after = taskList.slice(idx + 1);
      const arr = [ ...before, ...after];
  
      return {
        taskList: arr,
      }
    })
  };

  oncheckboxclick = (id) => {
    this.setState(({ taskList }) => {
      const newArr = taskList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            important: !item.important
          }
        }
        return item;
      })
      return {
        taskList: newArr,
      }
    })
  };

  render() {
    return (
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section class="main">
          <TaskList todo={this.state.taskList} 
                    onDeletedItem={this.ondeleteditem}
                    onCheckboxClick={this.oncheckboxclick}/>
          <Footer />
        </section>
      </section>
    );
  }
}

