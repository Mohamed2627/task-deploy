import React from 'react'
import { IoClose } from "react-icons/io5";
import classes from './style.module.scss';
import CartItem from '../CartItem';
import { ButtonComponent, LoadingComponet, NoData } from '../../General';
import { getCartProducts } from '../../../services';
import { Context } from '../../../context/ContextProvider';

class Cart extends React.Component {
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
    this.dialog.addEventListener("click", e => {
      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        this.closeModal()
      }
    })

    this.dialog.addEventListener("close", e => {
      this.body.style.overflow = 'auto';
    })

    this.props.setEventFun(this.openModal)
  }

  componentWillUnmount() {
    this.dialog.removeEventListener('click', () => { })
    this.dialog.removeEventListener('close', () => { })
  }

  // Fun----------------------------------
  calculateTotalPrice = (data) => {
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

    return totalPrice
  }

  getCartData = () => {
    getCartProducts().then((data) => {
      const totalPrice = this.calculateTotalPrice(data);
      this.setState({ totalPrice });
      this.setState({ cartData: [...data] });
    }).catch((err) => {
      console.log(err)
    })
  }

  closeModal = () => {
    this.dialog?.close();
    this.body.style.overflow = 'auto';
  }

  formatPrice = (price) => (price)?.toLocaleString('en-US');

  openModal = () => {
    this.body.style.overflow = 'hidden';
    this.getCartData();
    this.dialog?.showModal();
  }

  removeProduct = (productId, quantity) => {
    let newCartData = this.state.cartData?.filter((item) => item.id !== productId);
    const newPrice = this.calculateTotalPrice(newCartData)
    this.setState({ cartData: [...newCartData] })
    this.setState({ totalPrice: newPrice })
    localStorage.setItem('cart', JSON.stringify(newCartData));
    const { count, setCount } = this.context
    setCount(count - quantity);
  }


  render() {
    return (
      <dialog
        id='dialog'
        className={classes.modalContainer}
      >
        <div className={classes.modalContent}>
          <IoClose
            size={30}
            onClick={this.closeModal}
            className={classes.closeIcon}
          />
          <h2 className={classes.cartWord}>My Cart</h2>
          <p className={classes.summaryWord}>Cart Summary</p>
          {!this.state.cartData ? (
            <LoadingComponet style={{
              width: 100,
              height: 100
            }} />
          ) : this.state.cartData?.length == 0 ? (
            <NoData text={'Your Cart is Empty'} />
          ) : (
            <>
              <div className={classes.itemsContainer}>
                {this.state.cartData?.map((item) => (
                  <CartItem key={item.id} data={item} removeProduct={this.removeProduct} />
                ))}
              </div>
              <p className={classes.totalPrice}>Total: {this.formatPrice(this.state.totalPrice)} LE</p>
              <div className={classes.btnsContainer}>
                <ButtonComponent
                  text={'Review Cart'}
                  style={{
                    backgroundColor: '#fff200',
                    color: 'black',
                    fontSize: 12,
                    height: 35,
                  }}
                />
                <ButtonComponent
                  text={'Complete Checkout'}
                  style={{
                    backgroundColor: '#542e90',
                    fontSize: 12,
                    height: 35,
                    minWidth: 150
                  }}
                />
              </div>
            </>
          )}
        </div>
      </dialog>
    )
  }
}

export default Cart