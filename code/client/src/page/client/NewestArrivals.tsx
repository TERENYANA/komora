import { useEffect, useState } from "react";
import styles from "@/assets/css/user/newestArrivals.module.css";
import type Product from "@/model/Product";
import ProductAPI from "@/service/product_api";
const NewestArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    new ProductAPI().selectAll().then((response) =>
      setProducts(response.data)
    );
  }, []);
  return (
    <div className={styles.arrivalsContainer}>
      <h2 className={styles.sectionTitle}>Newest Arrivals</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.productsRow}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/img/${product.imageURL}`}
                  alt={product.name}
                  className={styles.productImage}
                />
                <button type="button" className={styles.addButton}>
                  <img src="/public/img/plus-ba.svg" alt={product.name} />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.viewAllContainer}>
        <a href="/catalogall" className={styles.viewAllLink}>
          View All Products
        </a>
      </div>
    </div>
  );
};
export default NewestArrivals;