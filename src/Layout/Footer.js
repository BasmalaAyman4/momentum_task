import React from 'react'
import logo from '../assets/images/logo.png'
import styles from '../Styles/footer.module.css'
const Footer = () => {
  return (
    <>
<footer className={`${styles.footer}`}>
    <div className={`${styles.footer__body}`}>
        <img alt='' src={logo} className={`${styles.logo}`}/>
        <p className={`${styles.footer__para}`}>Day Of Submission : 19/02/2025</p>
    </div>
</footer>
    </>
  )
}

export default Footer