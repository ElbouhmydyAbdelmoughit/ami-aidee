import React from 'react';
import './snackBar.css';

export const SnackBar = ({isShown, message, level, forceHide}) => {
  return (
    <div
      id="infoView"
      className={isShown ? 'display-info' : 'hide-info'}
      style={{backgroundColor: level}}>
      <div>{message}</div>
    </div>
  );
};
