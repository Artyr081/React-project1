import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  render() {
    const { label, onDeletedItem, onCheckboxClick, date } = this.props;

    return (
      <div>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onCheckboxClick} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created{formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" onClick={onDeletedItem} />
        </div>
        <input type="text" className="edit" value="Editing task" />
      </div>
    );
  }
}

Task.defaultProps = {
  onDeletedItem: () => {},
  onCheckboxClick: () => {},
};
