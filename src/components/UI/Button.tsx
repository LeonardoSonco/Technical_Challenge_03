import React from "react";

import styles from "./Button.module.css"


interface ButtonProps{
    buttonTitle: string;
    buttonType: "submit";
    Onclick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ buttonTitle, buttonType,Onclick }) => {
  return <button type={buttonType} className={styles.button} onClick={Onclick}>
    {buttonTitle}
  </button>;
};

export default Button;
