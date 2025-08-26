import styles from './PrimaryLayout.module.scss';

interface IMainLayoutProps {
  children?: React.ReactNode;
}
const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>Header</header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default MainLayout;
