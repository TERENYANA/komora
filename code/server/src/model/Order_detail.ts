import type Product from "./Product.ts"
import type Order from "./Orders.ts"
type Order_detail = {
    id: number;
    quantity: number;
    product_id: number;
    product: Product;
    order_id: number;
    order: Order;
};
export default Order_detail;
