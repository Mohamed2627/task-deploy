import React from 'react'
import classes from './style.module.scss';
import { MdStarRate } from "react-icons/md";


const RateComponent = ({ iconSize, rate, noOfRates, containerStyle }) => {

  return (
    <div className={classes.container} style={containerStyle}>
      {rate ? (
        <>
          {Array(5).fill(1).map((item, index) => (
            <MdStarRate key={index} size={iconSize ?? 17} style={{ minWidth: 20 }} fill={rate >= index + 1 ? 'gold' : '#e8d3d3'} />
          ))}
          <p className={classes.rate}>{4.3} of 5</p>
          {noOfRates && <p className={classes.ratingsNumber}>{noOfRates} rates</p>}
        </>
      ) : (
        <span className={classes.noRate}>no rate yet</span>
      )}

    </div>
  )
}

export default RateComponent