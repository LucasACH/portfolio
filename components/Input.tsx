import { HTMLInputTypeAttribute } from 'react';

import styles from '../styles/components/Input.module.css';

interface InputProps {
  type: HTMLInputTypeAttribute | undefined;
  placeholder: string | undefined;
  name: string | undefined;
  required: boolean | undefined;
}

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  required,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      required={required}
    />
  );
};
