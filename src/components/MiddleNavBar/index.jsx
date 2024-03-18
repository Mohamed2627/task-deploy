import React from 'react'
import classes from './style.module.scss';
import { IoSearch } from "react-icons/io5";
import { IMAGES } from '../../assets';
import { FaRegHeart } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import Cart from '../Cart/Cart';
import { Context } from '../../context/ContextProvider';
import { NavItem } from '../General';



class MiddleNavBar extends React.Component {

  static contextType = Context

  constructor() {
    super()
  }

  handleOpenModal = () => { }

  setEventFun = (funRef) => {
    this.handleOpenModal = funRef
  }

  render() {
    const { count } = this.context
    return (
      <div className={classes.container}>
        <div className={classes.searchContainer}>
          <IoSearch className={classes.searchIcon} size={25} />
          <input type="text" className={classes.searchInput} placeholder='Search' />
        </div>
        <img loading='lazy' className={classes.brandLogo} src={IMAGES.PRODUCT.adidas} alt="photo" />
        <div className={classes.rightSideWrapper}>
          <NavItem
            icon={<img src={IMAGES.NavBar.cartIcon} />}
            text={'Cart'}
            badge={count}
            containerStyle={{
              paddingTop: 20,
              paddingBottom: 20
            }}
            onClick={this.handleOpenModal}
          />
          <NavItem
            icon={<FaRegHeart size={25} />}
            text={'Wishlist'}
          />
          <NavItem
            icon={<MdPersonOutline size={25} />}
            text={'Login'}
          />
        </div>
        <Cart
          setEventFun={this.setEventFun}
        />
      </div>
    )
  }

}

export default MiddleNavBar