import React, { Component } from 'react';
import { getCartProducts } from '../services/cartService';

const Context = React.createContext()

class ContextProvider extends Component {

  state = {
    count: 0,
    currentRoute: null
  }

  setCount = (count) => {
    this.setState({ count: count })
  }

  setCurrentRoute = (route) => {
    this.setState({ currentRoute: route })
  }

  componentDidMount() {
    // back Button event
    window.addEventListener('popstate', this.handleBackButtonClick);
    getCartProducts().then((data) => {
      let totalQuantity = data?.reduce((total, current) => {
        return total + current?.quantity
      }, 0)
      this.setState({ count: totalQuantity })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', () => { });
  }

  handleBackButtonClick = (event) => {
    //Reset states To handle when navigating again to currentRoute state after clicking on backButton
    this.setState({ currentRoute: null })
  };

  render() {
    const { children } = this.props
    const { count, currentRoute } = this.state
    const { setCount, setCurrentRoute } = this

    return (
      <Context.Provider
        value={{
          count,
          setCount,
          currentRoute,
          setCurrentRoute
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default ContextProvider;
export { Context }