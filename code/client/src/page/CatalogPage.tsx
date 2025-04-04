// Catalog.jsx

import { useEffect, useState } from "react";
import styles from "../assets/css/user/catalog.module.css";
import type Product from "@/model/Product";
import ProductAPI from "@/service/product_api";
import { useParams } from "react-router-dom";

const Catalog = () => {
	const [products, setProducts] = useState<Product[]>([]);

	const {id} = useParams();

	useEffect(() => {
		new ProductAPI().selectByCategory(id as unknown as number).then((response) => setProducts(response.data));
	}, [id]);

	return (
		<div className={styles.catalogContainer}>
			<div className={styles.catalogGrid}>
				{products.map((product) => {
					return (
						<div key={product.id} className={styles.productCard}>
							<div className={styles.imageContainer}>
								<img
									src={`${import.meta.env.VITE_API_URL}/img/${product.imageURL}`}
									alt={product.name}
									className={styles.productImage}
								/>
								<button type="button" className={styles.addButton}>
									<img src="/public/img/plus-ba.svg" alt="" />
								</button>
							</div>
							<div className={styles.productInfo}>
								<h3 className={styles.productName}>{product.name}</h3>
								<p className={styles.productPrice}>${product.price}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Catalog;
