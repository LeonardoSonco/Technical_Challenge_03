import React from "react";

import styles from "./Header.module.css"

interface HeaderProps{
    title:string;
    loginIsTrue: boolean;
}

const Header: React.FC<HeaderProps> = ({title,loginIsTrue}) => {
  
  
  return (
    <header>
      <nav className={styles.navHeader}>
        {loginIsTrue ? (
          <div className={styles.navbarHeader}>
            <img src="/src/images/logo.png" alt="Logo FitMe" />
            <div className={styles.navbarHeaderSearch}>
                <input type="text" className={styles.navbarHeaderSearchInput}/>
                <img src="/src/images/bag.png" alt="Sacola de compras" className={styles.navbarHeaderBag}/>
                <button className={styles.navbarHeaderSearchButton}>Sign In</button>
            </div>
          </div>
        ) : (
          <div className={styles.navbarHeaderAuth}>
            <img src="/src/images/logo.png" alt="Logo FitMe" />
            <h3>{title}</h3>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
