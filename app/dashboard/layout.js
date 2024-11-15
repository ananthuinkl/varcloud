import {Navbar} from "../ui/dashboard/navbar/navbar"
import {Sidebar} from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Navbar/>
      </div>
      <div className={styles.sidebar}>
        <Sidebar/>
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  )
}

export default Layout;
