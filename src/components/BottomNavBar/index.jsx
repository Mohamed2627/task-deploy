import React from 'react'
import classes from './style.module.scss'
import { NavItem } from '../General'
import { Navigate } from 'react-router-dom'
import { Context } from '../../context/ContextProvider'

export const navData = [
  {
    route: 'men',
    name: 'Men'
  },
  {
    route: 'women',
    name: 'Women'
  },
  {
    route: 'unisex',
    name: 'Unisex'
  },
  {
    route: 'bestSeller',
    name: 'Best Sellers'
  },
  {
    route: 'newArrivals',
    name: 'New Arrivals'
  },
  {
    route: 'offers',
    name: 'Offers'
  },
]

class BottomNavBar extends React.Component {
  static contextType = Context
  constructor() {
    super()
    this.state = {
      navToggle: false,
    }
  }


  componentDidMount() {
    // back Button event
    window.addEventListener('popstate', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', () => { });
  }

  handleBackButtonClick = (event) => {
    //Reset states To handle when navigating again to currentRoute state after clicking on backButton
    this.setState({ navToggle: false })
  };

  render() {
    const { currentRoute, setCurrentRoute } = this.context
    return (
      <div
        className={classes.container}
      >
        {navData.map((item, index) => (
          <NavItem
            onClick={() => {
              setCurrentRoute(item.route)
              this.setState({ navToggle: true });
            }}
            key={index}
            text={item.name}
            textStyle={{
              color: index == navData.length - 1 ? 'red' : '#FFF',
              fontWeight: 500,
              fontSize: 14,
              borderBottom: item.route == currentRoute ? '1px solid #FFF' : 'none'
            }}
          />
        ))}
        {this.state.navToggle && <Navigate to={`/${currentRoute}`} />}
      </div>
    )
  }
}

export default BottomNavBar