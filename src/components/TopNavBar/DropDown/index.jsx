import React from 'react'
import classes from './style.module.scss';
import { navData } from '../../BottomNavBar';
import { Context } from '../../../context/ContextProvider';


// const  DropDown = ({ onClick }) => {
class DropDown extends React.Component {

  static contextType = Context;

  render() {
    const { setCurrentRoute } = this.context
    const { onClick } = this.props

    return (
      <div className={classes.container}>
        {navData.map((item, index) => (
          <p
            key={index}
            className={classes.navItem}
            onClick={() => {
              setCurrentRoute(item.route)
              onClick()
            }}
          >{item.name}
          </p>
        ))}
      </div>
    )
  }

}

export default DropDown