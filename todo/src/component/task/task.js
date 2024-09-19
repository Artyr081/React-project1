import React, { Component } from "react";

export default class Task extends Component {

  render() {

    const {label, onDeletedItem, onCheckboxClick} = this.props;

    return (
      <div>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCheckboxClick}/>
          <label>
            <span className="description">{label}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeletedItem}></button>
        </div>
        <input type="text" className="edit" value="Editing task" /> 
      </div>  
    );
  };
};
