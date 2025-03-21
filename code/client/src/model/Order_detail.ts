
import type Product from "./Product.ts"
import type Orders from "./Orders.ts"

type Order_detail = {
    id: number;
    quantity: number;
    product_id: number;
    product: Product;
    order_id: number;
    orders: Orders;
};
export default Order_detail;
