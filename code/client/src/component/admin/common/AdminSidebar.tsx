import { Link, useLocation } from 'react-router-dom';
import styles from "../../../assets/css/admin/sidebar.module.css";
import {
  IoStorefrontOutline,
  IoPrismOutline,
  IoReceiptOutline,
  IoPeopleOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useState } from 'react';

const AdminSidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const location = useLocation();

  // Function to check if the current path matches the link's path
  const isActive = (path:string) => {
    return location.pathname.includes(path);
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <nav className={`${styles.sidebar} ${isSidebarClosed ? styles.close : ''}`}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <button onClick={toggleSidebar} type="button" className={styles.togglebtn}>
            <MdKeyboardDoubleArrowLeft />
          </button>
        </li>
        <li className={styles.menuItem}>
          <Link
            to=""
            className={`${styles.menuLink} ${isActive('') ? styles.activeLink : ''}`}
          >
            <IoPrismOutline
              className={`${styles.menuIcon} ${isActive('') ? styles.activeIcon : ''}`}
            />
            <span>Home</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="product"
            className={`${styles.menuLink} ${isActive('product') ? styles.activeLink : ''}`}
          >
            <IoStorefrontOutline
              className={`${styles.menuIcon} ${isActive('product') ? styles.activeIcon : ''}`}
            />
            <span>Products</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="orders"
            className={`${styles.menuLink} ${isActive('orders') ? styles.activeLink : ''}`}
          >
            <IoReceiptOutline
              className={`${styles.menuIcon} ${isActive('orders') ? styles.activeIcon : ''}`}
            />
            <span>Orders</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="user"
            className={`${styles.menuLink} ${isActive('user') ? styles.activeLink : ''}`}
          >
            <IoPeopleOutline
              className={`${styles.menuIcon} ${isActive('user') ? styles.activeIcon : ''}`}
            />
            <span>Users</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/logout"
            className={`${styles.logoutLink} ${isActive('logout') ? styles.activeLink : ''}`}
          >
            <IoLogOutOutline
              className={`${styles.logoutIcon} ${isActive('logout') ? styles.activeIcon : ''}`}
            />
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;