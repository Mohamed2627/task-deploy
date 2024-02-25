import React from 'react'
import classes from './style.module.scss'
import TopNavBar from '../../TopNavBar';
import BottomNavBar from '../../BottomNavBar';
import { Footer } from '../../Footer';
import MiddleNavBar from '../../MiddleNavBar';
import { Outlet } from 'react-router-dom';

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minHeight: ''
    }
    this.getMinimumContentHeight = this.getMinimumContentHeight.bind(this)
  }

  componentDidMount() {
    this.getMinimumContentHeight()
  }

  getMinimumContentHeight = () => {
    const footer = document.getElementById('footer-container')
    if (window.innerHeight - footer?.offsetHeight > 0) {
      this.setState({ minHeight: window.innerHeight - footer?.offsetHeight })
    }
  }

  render() {
    return (
      <div className={classes.pageContainer} >
        <div className={classes.pageContent} style={{ minHeight: this.state.minHeight ?? '' }} >
          <TopNavBar />
          <MiddleNavBar />
          <BottomNavBar />
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }
}

export default PageContainer