import React from 'react'
import classes from './style.module.scss';
import { IMAGES } from '../../../assets';

const SocialIcon = ({ icon, name }) => {
  return (
    <div className={classes.socialContainer}>
      <img
        loading='lazy'
        src={icon}
        className={classes.icon}
        alt=""
      />
      <p className={classes.iconName}>{name}</p>
    </div>
  )
}

export default SocialIcon