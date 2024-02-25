import React from 'react'
import classes from './style.module.scss';
import ButtonComponent from '../ButtonComponent';
import { Navigate } from 'react-router-dom';

class PageNotFound extends React.Component {

  constructor() {
    super()
    this.state = {
      navToggle: false
    }
  }

  goToHome = () => {
    this.setState({ navToggle: true })
  }

  componentWillUnmount() {
    this.setState({ navToggle: false })
  }

  render() {
    return (
      <div className={classes.container}>
        <h1>Oops</h1>
        <p className={classes.text}>The Required Page Is Not Found</p>
        <ButtonComponent
          onClick={this.goToHome}
          style={{
            fontSize: 20
          }}
          text={'Go To Home'}
        />
        {this.state.navToggle && <Navigate to={'/'} />}
      </div>
    )
  }
}

export default PageNotFound 