import React from 'react'
import classes from './style.module.scss'

const LoadingComponet = ({ style }) => {
  return (
    <div className={classes.container} style={style}>
      <div className={classes.loader}></div>
    </div>
  )
}

export default LoadingComponet