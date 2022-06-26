import styles from '../styles/layouts/SafeArea.module.css';

interface SafeAreaProps {
  children: JSX.Element | JSX.Element[];
}

export const SafeArea: React.FC<SafeAreaProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
