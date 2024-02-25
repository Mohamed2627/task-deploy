import React from 'react'
import { ProductDetails, SimilarProducts } from '../../components';
import classes from './style.module.scss'
import { getProducts } from '../../services';

class ProductPage extends React.Component {

  constructor() {
    super();
    this.state = {
      minHeight: '',
      currentProduct: null,
      allData: null,
    }
    this.getMinimumContentHeight = this.getMinimumContentHeight.bind(this)
  }

  fetchData = () => {
    getProducts().then((data) => {
      this.setState({ allData: data });
      this.setState({ currentProduct: data[0] });
    })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getMinimumContentHeight();
    this.fetchData()
  }

  setCurrentProduct = (prod) => {
    this.setState({ currentProduct: { ...prod } })
  }


  getMinimumContentHeight = () => {
    const footer = document.getElementById('footer-container')
    if (window.innerHeight - footer?.offsetHeight > 0) {
      this.setState({ minHeight: window.innerHeight - footer?.offsetHeight })
    }
  }

  render() {
    return (
      <>
        <div className={classes.pathContainer}>
          <a className={classes.pathItem} href="#">Men</a>/
          <a className={classes.pathItem} href="#">Men</a>/
          <a className={classes.pathItem} href="#">Clothing</a>/
          <a className={classes.pathItem} href="#">Tops</a>/
          <a className={classes.pathItem} href="#">Adidas</a>/
          <span className={classes.pathItem}>Adidas Black T-Shirt</span>
        </div>
        <ProductDetails productData={this.state.currentProduct} />
        <SimilarProducts data={this.state.allData} setProduct={this.setCurrentProduct} />
      </>
    )
  }
}

export default ProductPage