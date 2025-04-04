import type User from "./User";

type Orders = {
    id: number;
    totalprice: number;
    date: number;
    user_id: number;
    user: User;
};
export default Orders;