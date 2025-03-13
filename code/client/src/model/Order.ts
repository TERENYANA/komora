import type User from "./User.ts";

type Order = {
    id: number;
    totalprice: number;
    date: number;
    user_id: number;
    user: User;
};
export default Order;