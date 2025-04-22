import { useEffect, useState } from "react";
import styles from "../../../assets/css/admin/adminproductlist.module.css";
import type Orders from "@/model/Orders";
import OrdersAPI from "@/service/orders_api";
const AdminOrdersList = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    new OrdersAPI().selectAll().then((response) => setOrders(response.data));
  }, []);

  return (
    <div className={styles.productlist}>
      <div className={styles.scrollIndicator}>
        Faites défiler horizontalement pour voir toutes les données →
      </div>

      {/* Conteneur avec défilement horizontal */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Total price</th>
              <th>User</th>
              <th>Email</th>
              <th>Address</th>
              <th>Number</th>

              {/* <th className={styles.actionsColumn}>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr key={orders.id || Math.random()}>
                 <td>{orders.id}</td>
                 <td>{orders.totalprice}</td>
                 <td>{orders.user_id}</td>
                 <td>{orders.user.email}</td>
                 <td>
                    <ul>
                      {orders.user.addresses?.map(address => (
                        <li key={address.id}>{address.name}</li>
                      )) || 'N/A'}
                    </ul>
                 </td>
                 <td>{orders.user.number}</td>

                {/* <td>{orders.id}</td>
                <td className={styles.description}>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    alt="product-image"
                    src={`${import.meta.env.VITE_API_URL}/img/${product.imageURL}`}
                  />
                </td>
                <td>{product.weight}</td>
                <td>{product.stock}</td>
                <td>{product.category_id}</td>
                <td>{product.brand_id}</td>
                <td className={styles.actionsColumn}>
                  <Link className={styles.btn} to={`/admin/product/form/${product.id}`}>
                    Update
                  </Link>
                  <Link className={styles.btn} to={`/admin/product/delete/${product.id}`}>
                    Delete
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table>
          <thead>
            <tr>
            <th>Firstname</th>
            <th>LastName</th>
            <th>Phone</th>
            <th>Adsress</th>
            <td
          </thead>
          <tbody>
            t
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default AdminOrdersList;