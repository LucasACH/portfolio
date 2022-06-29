import styles from '../styles/components/TextArea.module.css';

interface TextAreaProps {
  name: string | undefined;
  placeholder: string | undefined;
  required: boolean | undefined;
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder,
  required,
}) => {
  return (
    <textarea
      className={styles.textarea}
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
};
