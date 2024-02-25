import React from 'react'
import { LoadingComponet, ProductCard } from '../../components'
import classes from './style.module.scss'
import { getProducts } from '../../services';

class MenPage extends React.Component {

  constructor() {
    super();
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    getProducts().then((data) => {
      this.setState({ data })
    }).then(err => {
      console.log(err)
    })
  }

  render() {

    return (
      <div className={classes.container}>
        {!this.state.data ? (
          <LoadingComponet />
        ) : (
          <>
            {this.state.data.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </>
        )}
      </div>
    )
  }
}

export default MenPage