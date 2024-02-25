import React from 'react';
import classes from './style.module.scss';


const ButtonComponent = ({ text, style, onClick }) => {

  return (
    <button
      onClick={onClick}
      className={classes.btnContainer}
      style={style}>
      {text}
    </button>
  )
}

export default ButtonComponent