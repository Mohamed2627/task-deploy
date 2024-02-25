import React from 'react';
import classes from './style.module.scss';
import ProductCard from '../ProductCard';
import { LoadingComponet } from '../../General';


const SimilarProducts = ({ data, setProduct }) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Similar Products</h2>
      <p className={classes.desc}>You may like these products also</p>
      <div className={classes.cardsContainer}>
        {!data ? (
          <LoadingComponet />
        ) : (
          <>
            {data.map((product) => (
              <ProductCard key={product.id} data={product} onClick={() => setProduct(product)} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SimilarProducts