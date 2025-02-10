import Lestpage from "./leftarea";
import Restpaget from "./rightarea";
import styles from "./estimation.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.larea}>
        <Lestpage />
      </div>
      <div className={styles.rarea}>
        <div className={styles.rt}>
          <Restpaget />
        </div>
        <div className={styles.rb}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
