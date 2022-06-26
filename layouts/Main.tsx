import styles from '../styles/layouts/Main.module.css';

interface MainProps {
  children: JSX.Element | JSX.Element[];
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
