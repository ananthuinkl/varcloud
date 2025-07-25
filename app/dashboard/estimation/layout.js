import Leftpage from "./leftarea";
import Rightpaget from "./rightarea";
import styles from "./estimation.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.larea}>
        <Leftpage />
      </div>
      <div className={styles.rarea}>
        <div className={styles.rt}>
          <Rightpaget />
        </div>
        <div className={styles.rb}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
