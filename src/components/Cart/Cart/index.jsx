import React from 'react'
import { IoClose } from "react-icons/io5";
import classes from './style.module.scss';
import CartItem from '../CartItem';
import { ButtonComponent, LoadingComponet, NoData } from '../../General';


class Cart extends React.Component {

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
  }

  componentWillUnmount() {
    this.dialog.removeEventListener('click', () => { })
    this.dialog.removeEventListener('close', () => { })
  }

  closeModal = () => {
    this.dialog?.close();
    this.body.style.overflow = 'auto';
  }

  formatPrice = (price) => (price)?.toLocaleString('en-US');


  render() {
    const { cartData, totalPrice } = this.props
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
          {!cartData ? (
            <LoadingComponet style={{
              width: 100,
              height: 100
            }} />
          ) : cartData?.length == 0 ? (
            <NoData text={'Your Cart is Empty'} />
          ) : (
            <>
              <div className={classes.itemsContainer}>
                {cartData?.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              <p className={classes.totalPrice}>Total: {this.formatPrice(totalPrice)} LE</p>
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
                    height: 35
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