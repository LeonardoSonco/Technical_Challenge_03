import React, { ChangeEvent } from 'react';

import styles from './Input.module.css'

interface InputProps {
    labelName: string;
    typeInput: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

const Input: React.FC<InputProps> = ({labelName,typeInput,value,onChange,name}) =>{
    return (
        <label className={styles.labelInput}>
          {labelName}
          <input type={typeInput} value={value} onChange={onChange} name={name}/>
        </label>
      );
}

export default Input;

