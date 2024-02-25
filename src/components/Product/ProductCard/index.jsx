import React from 'react'
import classes from './style.module.scss';
import { IMAGES } from '../../../assets';
import RateComponent from '../RateComponent';
import PriceDiscount from '../PriceDiscount';
import ProductImage from '../ProductImage';


const ProductCard = ({ data, onClick = () => { } }) => {

  return (
    <div
      className={classes.container}
      onClick={onClick}
    >
      <ProductImage
        has3D={data?.has360}
        imgSrc={data?.img}
        containerStyle={{
          width: '100%',
          height: '60%'
        }}
        imgStyle={{
          width: '100%',
          height: '100%',
          borderRadius: 5
        }}
      />
      <div className={classes.productDetails}>
        <p className={classes.productDesc}>{data?.description}</p>
        <div className={classes.priceAndBrand}>
          <PriceDiscount price={data?.price} discount={data?.discount} />
          <img loading='lazy' className={classes.brandImg} src={data?.brand} alt="photo" />
        </div>
        <RateComponent rate={data?.rate} />
        <div
          className={classes.footer}
          style={{ justifyContent: false ? 'space-between' : 'center' }}
        >
          {data?.deliveryTime ? (
            <>
              <p className={classes.smText}>From: <span className={classes.boldText}>Egypt</span> </p>
              <p className={classes.smText}>To: <span className={classes.boldText}>Egypt</span> </p>
              <p className={classes.smText}>In: <span className={classes.boldText}>{`${data?.deliveryTime} Days`}</span> </p>
            </>
          ) : (
            <p className={classes.smText}>Pickup From: <span className={classes.boldText}>Genena Mall</span> </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard