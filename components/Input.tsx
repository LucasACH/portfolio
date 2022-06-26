import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

import styles from '../styles/components/Input.module.css';

interface InputProps {
  type: HTMLInputTypeAttribute | undefined;
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string | undefined;
}

export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
