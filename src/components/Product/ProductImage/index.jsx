import React from 'react'
import classes from './style.module.scss'
import { IMAGES } from '../../../assets'

const ProductImage = ({ imgSrc, has3D, containerStyle, imgStyle }) => {
  return (
    <div className={classes.container}
      style={containerStyle}
    >
      {has3D && (
        <div className={classes.overlay}>
          <img loading='lazy' src={IMAGES.PRODUCT.rotate360} alt="photo" className={classes.rotateImg} />
        </div>
      )}
      <img loading='lazy' src={imgSrc} alt="photo" style={imgStyle} />

    </div>
  )
}

export default ProductImage