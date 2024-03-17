import React from 'react'
import classes from './style.module.scss'
import RateComponent from '../../Product/RateComponent';
import PriceDiscount from '../../Product/PriceDiscount';
import { ButtonComponent, LoadingComponet } from '../../General';
import ProductImage from '../../Product/ProductImage';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Context } from '../../../context/ContextProvider';
import { addProductToCart } from '../../../services';


class ProductDetails extends React.Component {
  static contextType = Context
  constructor() {
    super()
    this.state = {
      currentImg: null,
      currentSize: null,
      currentColor: null,
      scrollImgages: null,
      quantity: 1,
      leftArrowToggle: false,
      rightArrowToggle: true,
      didUpdate: false,
    }
  }
  scrollContainer = null;

  componentDidUpdate(prevProps, prevState) {
    this.scrollContainer = document.getElementById('scrollContainer');
    const { productData } = this.props
    if (prevProps.productData?.id !== productData?.id) {
      this.setState({ didUpdate: false })
    } else if (productData && !this.state.didUpdate) {
      this.setState({ currentSize: productData.sizes[0] })
      this.setState({ currentColor: productData.colors[0] })
      this.setState({ scrollImgages: productData.colors[0].arr })
      this.setState({ currentImg: productData.colors[0].arr[0] })
      this.setState({ didUpdate: true })
    }
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', (e) => {
        if (this.scrollContainer.scrollLeft == 0) {
          this.setState({ leftArrowToggle: false })
        } else if (this.scrollContainer.scrollLeft > 0) {
          this.setState({ leftArrowToggle: true })
        }
        const maxScrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth - 20;
        if (this.scrollContainer && this.scrollContainer.scrollLeft >= maxScrollWidth) {
          this.setState({ rightArrowToggle: false })
        } else if (this.scrollContainer && this.scrollContainer.scrollLeft < maxScrollWidth) {
          this.setState({ rightArrowToggle: true })
        }
      })
    }
  }

  componentDidMount() {
    this.scrollContainer = document.getElementById('scrollContainer');
    if (this.scrollContainer) {

      this.scrollContainer.addEventListener('scroll', (e) => {
        if (this.scrollContainer.scrollLeft == 0) {
          this.setState({ leftArrowToggle: false })
        } else if (this.scrollContainer.scrollLeft > 0) {
          this.setState({ leftArrowToggle: true })
        }
        const maxScrollWidth = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth - 20;
        if (this.scrollContainer && this.scrollContainer.scrollLeft >= maxScrollWidth) {
          this.setState({ rightArrowToggle: false })
        } else if (this.scrollContainer && this.scrollContainer.scrollLeft < maxScrollWidth) {
          this.setState({ rightArrowToggle: true })
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.scrollContainer)
      this.scrollContainer?.removeEventListener('scroll', () => { })

  }

  // Utils------------------------------

  handleChangeSize = (obj) => {
    this.setState({ currentSize: { ...obj } })
  }

  handleChangeColor = (obj) => {
    this.setState({ currentColor: { ...obj } })
    this.setState({ scrollImgages: [...obj.arr] })
    this.setState({ currentImg: obj.arr[0] })

  }

  increaseCount = () => {
    this.setState({ quantity: ++this.state.quantity })
  }

  decreaseCount = () => {
    if (this.state.quantity >= 2) {
      this.setState({ quantity: --this.state.quantity })
    }
  }

  addToCart = () => {
    addProductToCart(this.props.productData, this.state.quantity)
  }

  handleScrollLeft = () => {
    if (this.scrollContainer)
      this.scrollContainer.scrollLeft -= 150;
  }

  handleScrollRight = () => {
    if (this.scrollContainer)
      this.scrollContainer.scrollLeft += 150;
  }


  render() {
    const { productData } = this.props;
    const { count, setCount } = this.context

    return (
      <div className={classes.container}>
        {!productData ? (
          <LoadingComponet />
        ) : (
          <>
            <div className={classes.imagesContainer}>
              <ProductImage
                imgSrc={this.state.currentImg?.src}
                has3D={productData?.has360}
                imgStyle={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 10,
                  minHeight: 400
                }}
              />
              <div className={classes.scrollContainer}>
                <div
                  className={classes.arrowIcon} >
                  {this.state.leftArrowToggle && (
                    <FaAngleLeft size={25} cursor={'pointer'} onClick={this.handleScrollLeft} />
                  )}
                </div>
                <div id='scrollContainer' className={classes.scrollImages}>
                  {this.state.scrollImgages?.map((img, index) => (
                    <img
                      loading='lazy'
                      id={`scrollImg${index}`}
                      key={index} src={img.src}
                      className={classes.scrollIMg}
                      alt="photo"
                      onClick={() => this.setState({ currentImg: img })}
                      style={{
                        border: this.state.currentImg.id == img.id ? '1px solid blue' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div className={classes.arrowIcon}>
                  {this.state.rightArrowToggle && (
                    <FaAngleRight size={25} cursor={'pointer'} onClick={this.handleScrollRight} />
                  )}
                </div>
              </div>
            </div>
            <div className={classes.detailsContainer}>
              <div className={classes.detailsSection}>
                <img loading='lazy' src={productData?.brand} alt="" className={classes.logo} />
                <p className={classes.description}>{productData?.description}</p>
                <p className={classes.category}>{productData?.category}</p>
                <RateComponent
                  iconSize={23}
                  rate={productData?.rate}
                  noOfRates={productData?.ratesNum}
                  containerStyle={{
                    justifyContent: 'flex-start',
                  }}
                />
                <PriceDiscount
                  price={productData?.price}
                  discount={productData.discount}
                  containerStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '50%',
                  }}
                  originalPriceStyle={{
                    marginLeft: 20
                  }}
                  percentStyle={{
                    width: 60
                  }}
                  priceStyle={{
                    fontSize: 30
                  }}
                />
              </div>
              <div className={classes.detailsSection} >
                <p className={classes.infoTitle}>Size</p>
                <div className={classes.sizesContainer}>
                  {productData?.sizes.map((size) => (
                    <p
                      onClick={() => this.handleChangeSize(size)}
                      key={size.id}
                      className={classes.size}
                      style={{
                        border: this.state.currentSize?.id == size.id ? 'none' : '1px solid rgba(235, 228, 228, 0.986)',
                        backgroundColor: this.state.currentSize?.id == size.id ? 'rgba(235, 228, 228, 0.986)' : '#FFF',
                        color: this.state.currentSize?.id == size.id ? 'black' : '#542e90'
                      }}
                    >
                      {size.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className={classes.detailsSection} >
                <p className={classes.infoTitle}>Color</p>
                <div className={classes.sizesContainer}>
                  {productData?.colors.map((color) => (
                    <img
                      loading='lazy'
                      onClick={() => this.handleChangeColor(color)}
                      key={color.id}
                      src={color.src}
                      className={classes.color}
                      style={{
                        border: this.state.currentColor?.id == color.id ? '2px solid #542e90' : 'none',
                      }}
                      alt="photo"
                    />
                  ))}
                </div>
              </div>
              <div className={classes.detailsSection} >
                <p className={classes.infoTitle}>Quantity</p>
                <div className={classes.quantityContainer}>
                  <div
                    onClick={this.decreaseCount}
                    className={classes.qauntityBtn}
                  >
                    <FaMinus size={14} />
                  </div>
                  <p className={classes.qauntityNumber}>{this.state.quantity}</p>
                  <div
                    onClick={this.increaseCount}
                    className={classes.qauntityBtn}
                  >
                    <FaPlus size={14} />
                  </div>
                </div>
                <div className={classes.cartBtns}>
                  <ButtonComponent
                    onClick={() => {
                      setCount(count + this.state.quantity);
                      this.addToCart()
                    }}
                    text={'Add To Cart'}
                  />
                  <ButtonComponent
                    onClick={() => { }}
                    text={'Pickup From Store'}
                    style={{
                      backgroundColor: '#fff200',
                      color: 'black'
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default ProductDetails