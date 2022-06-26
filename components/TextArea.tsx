import { ChangeEventHandler } from 'react';

import styles from '../styles/components/TextArea.module.css';

interface TextAreaProps {
  value: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  placeholder: string | undefined;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
