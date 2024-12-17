import Product from "./Product.js"
import Order from "./Order.js"
type Order_detail = {
    id: number;
    quantity: number;
    product_id: number;
    product: Product;
    order_id: number;
    order: Order;
};
export default Order_detail;
