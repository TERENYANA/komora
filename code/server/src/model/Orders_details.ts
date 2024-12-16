import Product from "./Product.js"
import Orders from "./Orders.js"
type Orders_details = {
    id: number;
    quantity: number;
    product_id: Product;
    product: Product;
    orders_id: number;
    orders: Orders;
};
export default Orders_details;
