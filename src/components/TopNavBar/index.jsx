import React from 'react'
import classes from './style.module.scss';
import { RiMenu2Fill } from "react-icons/ri";
import NavItem from '../General/NavItem';
import { LuPhoneCall } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import DropDown from './DropDown';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';

const rightSideData = [
  {
    name: 'Contact Us',
    icon: <LuPhoneCall size={20} />
  },
  {
    name: 'Track Order',
    icon: <IoCartOutline size={20} />
  },
  {
    name: 'Find A Store',
    icon: <IoLocationOutline size={20} />
  },
]

class TopNavBar extends React.Component {
  static contextType = Context
  constructor() {
    super()
    this.state = {
      dropdownToggle: false,
      navToggle: false,
    }
  }

  toggleDropdown = () => {
    this.setState({ dropdownToggle: !this.state.dropdownToggle })
  }

  handleRoute = () => {
    this.setState({ navToggle: true })
    this.toggleDropdown()
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
    const { currentRoute } = this.context

    return (
      <div className={classes.container}>
        {this.state.navToggle && <Navigate to={`/${currentRoute}`} />}

        <div className={classes.logoContainer}>
          {this.state.dropdownToggle && (
            <DropDown
              onClick={this.handleRoute}
            />
          )}
          <RiMenu2Fill
            cursor={'pointer'}
            size={20}
            onClick={this.toggleDropdown}
          />
          {/* Didn't find black logo */}
          <h2 className={classes.logo}>Yeshtry</h2>
        </div>
        <div className={classes.offersWrapper}>
          <p className={classes.offerText}>
            {'<  '}Valentines's Day Offers! Buy Two Get One Free{' '}
            <a href="#" className={classes.offerLink}>Shop Now</a>
            {'  >'}
          </p>
        </div>
        <div className={classes.rightSideWrapper}>
          {rightSideData.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.name}
              textStyle={{
                color: 'black',
                fontWeight: 600,
                fontSize: 12,
                width: 80,
              }}
            />
          ))}
        </div>
      </div>
    )
  }


}

export default TopNavBar