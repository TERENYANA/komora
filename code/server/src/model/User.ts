import Orders from "./Orders.js";
import Role from "./Role.js";

type User = {
    id: number;
    firstname: string;
    secondname: string;
    email: string;
    password: string;
    number: number;
    address: string;
    city: string;
    role_id: number;
    role: Role;
    orders_id: number;
    orders: Orders;
};
export default User;