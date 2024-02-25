import React from 'react'
import classes from './style.module.scss'

const PriceDiscount = ({ price, discount, containerStyle, priceStyle, originalPriceStyle, percentStyle }) => {

  const formatPrice = (price) => (price).toLocaleString('en-US');
  const priceAfterDiscount = (price) => {
    let newPrice = price - (price * (discount / 100))
    return formatPrice(newPrice)
  }

  return (
    <div
      style={containerStyle}
    >
      <p className={classes.price} style={priceStyle}>{discount ? priceAfterDiscount(price) : formatPrice(price)}<span className={classes.lE}> LE</span> </p>
      {discount && <div className={classes.discountContainer}>
        <p className={classes.originalPrice} style={originalPriceStyle}>{`${formatPrice(price)} LE`}</p>
        <p className={classes.discountPercentage} style={percentStyle} >{`${discount}${containerStyle?.flexDirection == 'row' ? '%off' : '%'}`}</p>
      </div>}
    </div>
  )
}

export default PriceDiscount