import { useEffect, useState } from "react";
import styles from "../../../assets/css/admin/adminproductlist.module.css";
import UserAPI from "@/service/user_api";
import type User from "@/model/User";

const AdminUserList = () => {
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    new UserAPI().selectAll().then((response) => setUser(response.data));
  }, []);

  return (
    <div className={styles.productlist}>
      {/* Indicateur de défilement pour petits écrans */}
      <div className={styles.scrollIndicator}>
      Scroll horizontally to see all the data →
      </div>
      {/* Conteneur avec défilement horizontal */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id || Math.random()}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td><ul>
                      {user.addresses?.map(address => (
                        <li key={address.id}>{address.name}</li>
                      )) || 'N/A'}
                    </ul></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;