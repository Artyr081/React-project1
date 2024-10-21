import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ label, onDeletedItem, onCheckboxClick, date,  
  clickTimerPause, clickTimerPlay, id, totalSeconds }) {
    
  const minutes = Math.floor((totalSeconds / 1000) / 60).toString().padStart(2, '0');
  const seconds = Math.floor((totalSeconds / 1000) % 60).toString().padStart(2, '0');

  return (
    <div>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCheckboxClick} />
        <label>
          <span className="title">{label}</span>
          <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          <span className="description description-position">
            <button className="icon icon-play" onClick={() => clickTimerPlay(id)} />
            <button className="icon icon-pause" onClick={() => clickTimerPause(id)} />
            {minutes}:{seconds}
          </span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeletedItem} />
      </div>
      <input type="text" className="edit" value="Editing task" />
    </div>
  );
}

Task.defaultProps = {
  onDeletedItem: () => {},
  onCheckboxClick: () => {},
};