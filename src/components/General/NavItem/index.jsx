import React from 'react'
import classes from './style.module.scss';
import { Navigate } from 'react-router-dom';


const NavItem = ({ icon = '', text, badge, badgeStyle = {}, containerStyle = {}, textStyle = {}, onClick = () => { } }) => {
  return (
    <div className={classes.itemContainer} style={containerStyle} onClick={onClick}>
      {badge !== undefined && (
        <span className={classes.badge} style={badgeStyle}>{badge}</span>
      )}
      {icon}
      <p className={classes.itemText} style={textStyle}>{text}</p>
    </div>
  )
}

export default NavItem