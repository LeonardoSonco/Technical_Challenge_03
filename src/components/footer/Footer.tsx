import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.navFooter}>
        <div className={styles.footerLogo}>
          <img src="/src/images/logoWhite.png" alt="Logo FitMe Branco" />
        </div>
        <div className={styles.listFooter}>
          <ul>
            <li>
              <a href="">About us</a>
            </li>
            <li>
              <a href="">Delivery</a>
            </li>
            <li>
              <a href="">Help & Suport</a>
            </li>
            <li>
              <a href="">T&C</a>
            </li>
          </ul>
        </div>
        <div className={styles.contactFooter}>
          <span>Contact: <strong>+91 1234567899</strong></span>
        </div>
      </nav>
      <div className={styles.networkFooter}>
      <a href=""><img src="/src/images/facebookIcon.png" alt="Link para o facebook" /></a>
      <a href=""><img src="/src/images/instagramIcon.png" alt="Link para o instagram" /></a>
      <a href=""><img src="/src/images/twitterIcon.png" alt="Link para o twitter" /></a>
      </div>
    </footer>
  );
};

export default Footer;
