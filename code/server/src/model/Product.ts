import type Brand from "./Brand.ts";
import type Category from "./Category.ts";

type Product = {
    id: number;
    name: string;
    description : string;
    price: number;
    imageURL: string;
    weight: number;
    stock: number;
    category_id: number;
    category: Category;
    brand_id: number;
    brand: Brand;

};
export default Product;