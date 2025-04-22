import { useForm } from "react-hook-form";
import type Product from "@/model/Product";
import ProductAPI from "@/service/product_api";
import { useContext, useEffect, useState } from "react";
import type Category from "@/model/Category";
import CategoryAPI from "@/service/category_api";
import { useNavigate, useParams } from "react-router-dom";
import BrandAPI from "@/service/brand_api";
import type Brand from "@/model/Brand";
import SecurityAPI from "@/service/security_api";
import { UserContext } from "@/component/provider/UserProvider";
import styles from "@/assets/css/admin/adminproductform.module.css";

const AdminProductForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Product>();

  const [categories, setCategories] = useState<Category[]>();
  const [brands, setBrands] = useState<Brand[]>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    Promise.allSettled([
      new CategoryAPI().selectAll(),
      new BrandAPI().selectAll(),
      id ? new ProductAPI().selectOne(id as unknown as number) : null,
    ]).then((responses) => {
      if (responses[0].status === "fulfilled") {
        setCategories(responses[0].value.data);
      }
      if (responses[1].status === "fulfilled") {
        setBrands(responses[1].value.data);
      }
      if (id && responses[2]?.status === "fulfilled") {
        reset(responses[2].value.data);
      }
    });
  }, [id, reset]);

  const onSubmitProduct = async (values: Product) => {
    const formData = new FormData();
    formData.append("id", values.id.toString());
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("imageURL", values.imageURL[0]);
    formData.append("weight", values.weight.toString());
    formData.append("stock", values.stock.toString());
    formData.append("category_id", values.category_id.toString());
    formData.append("brand_id", values.brand_id.toString());

    const auth = await new SecurityAPI().auth(user);
    const request = id
      ? await new ProductAPI().update(formData, auth.data.token)
      : await new ProductAPI().insert(formData, auth.data.token);

    if ([200, 201].includes(request.status)) {
      navigate("/admin/product");
    }
  };

  return (
    <form
      className={styles.adminForm}
      onSubmit={handleSubmit(onSubmitProduct)}
      encType="multipart/form-data"
    >
      {/* Name */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
          id="name"
          type="text"
          className={styles.input}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description:</label>
        <textarea
          id="description"
          className={styles.textarea}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
      </div>

      {/* Price */}
      <div className={styles.field}>
        <label htmlFor="price" className={styles.label}>Price:</label>
        <input
          id="price"
          type="number"
          step="0.01"
          className={styles.input}
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be greater than 0" },
          })}
        />
        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
      </div>

      {/* Image */}
      <div className={styles.field}>
        <label htmlFor="imageURL" className={styles.label}>Image:</label>
        <input
          id="imageURL"
          type="file"
          className={styles.input}
          accept="image/*"
          {...register("imageURL", id ? {} : { required: "Image is required" })}
        />
        {errors.imageURL && <p className={styles.error}>{errors.imageURL.message}</p>}
      </div>

      {/* Weight */}
      <div className={styles.field}>
        <label htmlFor="weight" className={styles.label}>Weight (kg):</label>
        <input
          id="weight"
          type="number"
          step="0.001"
          className={styles.input}
          {...register("weight", {
            required: "Weight is required",
            min: { value: 0.001, message: "Weight must be greater than 0" },
          })}
        />
        {errors.weight && <p className={styles.error}>{errors.weight.message}</p>}
      </div>

      {/* Stock */}
      <div className={styles.field}>
        <label htmlFor="stock" className={styles.label}>Stock:</label>
        <input
          id="stock"
          type="number"
          className={styles.input}
          {...register("stock", {
            required: "Stock is required",
            min: { value: 0, message: "Stock cannot be negative" },
          })}
        />
        {errors.stock && <p className={styles.error}>{errors.stock.message}</p>}
      </div>

      {/* Category */}
      <div className={styles.field}>
        <label htmlFor="category_id" className={styles.label}>Category:</label>
        <select id="category_id" className={styles.input} {...register("category_id", { required: "Category is required" })}>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category_id && <p className={styles.error}>{errors.category_id.message}</p>}
      </div>

      {/* Brand */}
      <div className={styles.field}>
        <label htmlFor="brand_id" className={styles.label}>Brand:</label>
        <select id="brand_id" className={styles.input} {...register("brand_id", { required: "Brand is required" })}>
          {brands?.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        {errors.brand_id && <p className={styles.error}>{errors.brand_id.message}</p>}
      </div>

      {/* Hidden ID */}
      <input type="hidden" {...register("id")} value={id} />

      {/* Submit */}
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default AdminProductForm;
