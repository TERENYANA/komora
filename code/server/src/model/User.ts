import Address from "./Address.js";
import Order from "./Order.js";
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
    order_id: number;
    order: Order;
    address_ids: string;
    addresses: Address[];
};
export default User;