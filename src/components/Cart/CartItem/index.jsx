import React from 'react';
import classes from './style.module.scss';
import { IMAGES } from '../../../assets';
import { PriceDiscount } from '../../Product';
import { ButtonComponent } from '../../General';


const CartItem = ({ data }) => {
  return (
    <div className={classes.container}>
      <img loading='lazy' className={classes.itemImage} src={data?.img} alt="photo" />
      <div className={classes.itemDetails}>
        <p className={classes.itemDescription}>{data?.description}</p>
        <p className={classes.quantity}>{`Quantity: ${data?.quantity}`}</p>
        <div className={classes.wrapper}>
          <PriceDiscount
            price={data?.price}
            priceStyle={{
              fontSize: 15
            }}
          />
          <ButtonComponent
            text={'Remove'}
            style={{
              height: 25,
              width: 90,
              backgroundColor: '#fff200',
              borderRadius: 25,
              fontSize: 10,
              fontWeight: 700,
              color: '#000',
              marginTop: 0,
              marginBottom: 0
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem