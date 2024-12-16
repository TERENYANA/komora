import Brand from "./Brand.js";
import Category from "./Category.js";

type Product = {
    id: number;
    description : string;
    prise: number;
    imageURL: number;
    weight: number;
    stock: number;
    category_id: number;
    category: Category;
    brand_id: number;
    brand: Brand;

};
export default Product;