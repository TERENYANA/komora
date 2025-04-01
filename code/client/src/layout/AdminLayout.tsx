/*
les mises en page permettent de définir les composants communs à plusieurs mises en page
*/

import AdminSidebar from "@/component/admin/common/AdminSidebar";

import { Outlet } from "react-router-dom";

import styles from "../assets/css/admin/adminlayout.module.css";

const AdminLayout = () => {
  return <>
    <body className={styles.body}>
      <AdminSidebar />
      <main className={styles.main}>
      <Outlet/>
      </main>
      
</body>
</>
}

export default AdminLayout;