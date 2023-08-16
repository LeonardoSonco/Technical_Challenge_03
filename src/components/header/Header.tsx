import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  loginIsTrue: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, loginIsTrue }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className={styles.navHeader}>
        {loginIsTrue ? (
          <>
            {windowWidth > 700 ? (
              <div className={styles.navbarHeader}>
                <Link to={"/homepage"}>
                  <img src="/src/images/logo.png" alt="Logo FitMe" />
                </Link>
                <div className={styles.navbarHeaderSearch}>
                  <input
                    type="text"
                    className={styles.navbarHeaderSearchInput}
                  />
                  <img
                    src="/src/images/bag.png"
                    alt="Sacola de compras"
                    className={styles.navbarHeaderBag}
                  />
                  <Link to={"/"}>
                    <button className={styles.navbarHeaderSearchButton}>
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.navbarHeader}>
                  <Link to={"/homepage"}>
                    <img src="/src/images/logo.png" alt="Logo FitMe" />
                  </Link>
                  <div className={styles.navbarHeaderSearch}>
                    <img
                      src="/src/images/bag.png"
                      alt="Sacola de compras"
                      className={styles.navbarHeaderBag}
                    />
                    <button className={styles.navbarHeaderSearchButton}>
                      Sign In
                    </button>
                  </div>
                </div>
                <input type="text" className={styles.navbarHeaderSearchInput} />
              </>
            )}
          </>
        ) : (
          <>
            <div className={styles.navbarHeaderAuth}>
              <Link to={"/homepage"}>
                <img src="/src/images/logo.png" alt="Logo FitMe" />
              </Link>
              <h3>{title}</h3>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
