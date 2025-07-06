import { useEffect, useState } from "react";
import type Product from "@/model/Product";
import ProductAPI from "@/service/product_api";
import { Link } from "react-router-dom";
import styles from "../../../assets/css/admin/adminproductlist.module.css";
const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    new ProductAPI().selectAll().then((response) => setProducts(response.data));
  }, []);
  return (
    <div className={styles.productlist}>
      <p>
        <Link className={styles.btn} to={"/admin/product/form"}>Add form</Link>
      </p>
      {/* Indicateur de défilement pour petits écrans */}
      <div className={styles.scrollIndicator}>
      Scroll horizontally to see all the data →
      </div>
      {/* Conteneur avec défilement horizontal */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Weight</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th className={styles.actionsColumn}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id || Math.random()}>
                <td>{product.name}</td>
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
                <td>{product.category.name}</td>
                <td>{product.brand.name}</td>
                <td className={styles.actionsColumn}>
                  <Link className={styles.btn} to={`/admin/product/form/${product.id}`}>
                    Update
                  </Link>
                  <Link className={styles.btn} to={`/admin/product/delete/${product.id}`}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminProductList;
