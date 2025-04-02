import { useContext, useEffect, useState } from "react"
import type Product from "@/model/Product"
import ProductAPI from "@/service/product_api";
import { Link } from "react-router-dom";
import  styles from "/app/src/assets/css/admin/adminproductlist.module.css";


const AdminProductList = () => {
  //état pour stoquer des donées
  const [products, setProducts] = useState<Product[]>([]);


  //récupérer des donées è l'affichage du composant 
  
  
  useEffect(() => {
  new ProductAPI().selectAll().then(response => setProducts(response.data))
  }, []);
  
  return (
    <div className={styles.productlist}>
      <h2>Product List</h2>
      <p>
        <Link to={"/admin/product/form"}>Add form</Link>
      </p>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>imageURL</th>
          <th>weight</th>
          <th>stock</th>
          <th>category_id</th>
          <th>brand_id</th>
          </tr>
      </table>
      {
        products.map((product) => {
          return <tr key={Math.random()}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td><img alt="product-image" src={`${import.meta.env.VITE_API_URL}/img/${product.imageURL }`}/></td>
            <td>{product.weight}</td>
            <td>{product.stock}</td>
            <td>{product.category_id}</td>
            <td>{product.brand_id}</td>
            <Link className="btn" to={`/admin/product/form/${product.id}`}>Update</Link>
            <Link className="btn" to={`/admin/product/delete/${product.id}`}>Delete</Link>
          </tr>;
        })
      }
    </div>
  );
};

export default AdminProductList

