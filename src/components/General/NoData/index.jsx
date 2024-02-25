import React from 'react';
import classes from './style.module.scss'

const NoData = ({ text }) => {
  return (
    <div className={classes.container}>
      <p className={classes.text}>{text}</p>
    </div>
  )
}

export default NoData