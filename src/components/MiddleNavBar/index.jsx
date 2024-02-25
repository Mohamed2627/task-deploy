import React from 'react'
import classes from './style.module.scss';
import { IoSearch } from "react-icons/io5";
import { IMAGES } from '../../assets';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { ButtonComponent, NavItem } from '../General';
import { IoClose } from "react-icons/io5";
import CartItem from '../Cart/CartItem';
import Cart from '../Cart/Cart';
import { Context } from '../../context/ContextProvider';
import { getCartProducts } from '../../services/cartService';


class MiddleNavBar extends React.Component {

  static contextType = Context

  constructor() {
    super()
    this.state = {
      cartData: null,
      totalPrice: 0
    }
  }

  body = null;
  dialog = null;

  componentDidMount() {
    this.body = document.querySelector('body');
    this.dialog = document.getElementById('dialog');
  }

  getCartData = () => {
    getCartProducts().then((data) => {
      const totalPrice = data.reduce((total, current) => {
        if (current.discount) {
          let afterDiscount = current.price - (current.price * (current.discount / 100));
          let allQuantity = afterDiscount * current.quantity
          return total + allQuantity
        } else {
          let allQuantity = current.price * current.quantity
          return total + allQuantity
        }
      }, 0)
      this.setState({ totalPrice });
      this.setState({ cartData: data });
    }).catch((err) => {
      console.log(err)
    })
  }

  openModal = () => {
    this.body.style.overflow = 'hidden';
    this.getCartData()
    this.dialog?.showModal();
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
            icon={<FaShoppingCart size={25} />}
            text={'Cart'}
            badge={count}
            containerStyle={{
              paddingTop: 20,
              paddingBottom: 20
            }}
            onClick={this.openModal}
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
        <Cart cartData={this.state.cartData} totalPrice={this.state.totalPrice} />
      </div>
    )
  }

}

export default MiddleNavBar