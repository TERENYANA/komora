
import type Product from "./Product.js"
import type Orders from "./Orders.js"

type Order_detail = {
    id: number;
    quantity: number;
    product_id: number;
    product: Product;
    order_id: number;
    orders: Orders;
};
export default Order_detail;
