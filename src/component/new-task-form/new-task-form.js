import React, { Component } from 'react';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onLabelChangeMin = (e) => {
    this.setState({
      min: e.target.value
    })
  }

  onLabelChangeSec = (e) => {
    this.setState({
      sec: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = (Number((this.state.min * 60)) + Number(this.state.sec)) * 1000;
    this.props.onItemAdded(this.state.label, totalSeconds);
    this.setState({
      label: '',
      min: '',
      sec: ''
    });
  };

  hudleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className ='new-todo-form'>
        <input
          className='new-todo-form__timer'
          placeholder='What needs to be done?'
          onChange={this.onLabelChange}
          value={this.state.label}
          onKeyPress={this.hudleKeyPress}
        />
        <input className ='new-todo-form__timer' placeholder ='Min'
          onKeyPress={this.hudleKeyPress}
          value={this.state.min} 
          onChange={this.onLabelChangeMin}/>
        <input className ='new-todo-form__timer' placeholder ='Sec'
          onKeyPress={this.hudleKeyPress}
          value={this.state.sec}
          onChange={this.onLabelChangeSec} />     
      </form>
    );
  }
}