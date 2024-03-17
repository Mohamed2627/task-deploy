import React from 'react'
import classes from './style.module.scss'
import { IMAGES } from '../../../assets'
import SocialIcon from '../SocialIcon'

const data = ['About Us', 'Contact Us', 'Take Order', 'Terms & Conditions', 'Privacy Policy', 'Sell With Us', 'Shipping And Returns']
const socialData = [
  {
    icon: IMAGES.FOOTER.faceBook,
    name: '/YESHTRY',
  },
  {
    icon: IMAGES.FOOTER.linkedIn,
    name: '/YESHTRY',
  },
  {
    icon: IMAGES.FOOTER.instagram,
    name: '/YESHTRY',
  },
  {
    icon: IMAGES.FOOTER.twitter,
    name: '/YESHTRY',
  },
]
const Footer = () => {
  return (
    <div className={classes.footerContainer} id='footer-container'>
      <div className={classes.upperHalf}>
        <div className={classes.halfContainer}>
          <img loading='lazy' src={IMAGES.FOOTER.logo} className={classes.logo} alt="" />
          <p className={classes.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odio, ratione cupiditate iste illo esse iure ipsam qui aspernatur officia doloremque eaque voluptatum aliquam nihil architecto, ipsa libero! Sed, reiciendis! </p>
          <p className={classes.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum explicabo adipisci dolorum at laboriosam quod. Eaque non aperiam necessitatibus quae quaerat nostrum corrupti voluptatibus dicta est et quos vero iure recusandae possimus mollitia eos expedita, praesentium illum ex? Commodi quo sunt veritatis iusto? Esse ea dolore facilis vero incidunt itaque voluptates autem magnam, alias, ex deserunt iure officiis reprehenderit nisi?</p>
          <p className={classes.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, enim exercitationem unde veniam quibusdam deleniti nostrum quis sequi repudiandae ad voluptas impedit, nulla veritatis hic qui officiis architecto atque eos!</p>
        </div>
        <div className={classes.halfContainer}>
          <div className={classes.subscription} >
            <h3 className={classes.subscriptionTitle}>Subscribe to our newsletter</h3>
            <div className={classes.formContainer}>
              <input type="text" className={classes.textInput} placeholder={'Enter Your Email'} />
              <button className={classes.submitContainer}>
                <span className={classes.subWord}>subscribe</span>
                <img loading='lazy' src={IMAGES.FOOTER.send} alt="" />
              </button>
            </div>
          </div>
          <div className={classes.infoAndSocial}>
            <div className={classes.info}>
              {data.map((item, index) => (
                <p key={index} className={classes.infoWord}>{item}</p>
              ))}
            </div>
            <div>
              {socialData.map((item, index) => (
                <SocialIcon key={index} icon={item.icon} name={item.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.lowerHalf}>
        <div className={classes.divContainer}>
          <p className={classes.rights}>@2021 yeshtery. all rights reserved</p>
        </div>
        <div className={classes.divContainer}>
          <img loading='lazy' src={IMAGES.FOOTER.cash} className={classes.payCard} alt="photo" />
          <img loading='lazy' src={IMAGES.FOOTER.visa} className={classes.payCard} alt="photo" />
          <img loading='lazy' src={IMAGES.FOOTER.masterCard} className={classes.payCard} alt="photo" />
        </div>
        <div className={classes.divContainer}>
          <p className={classes.powered}>Powered By</p>
          <img loading='lazy' src={IMAGES.FOOTER.nasNav} className={classes.payCard} alt="photo" />
        </div>
      </div>
    </div>
  )
}

export default Footer