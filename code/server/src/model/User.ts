import type Address from "./Address.js";
import type Order from "./Orders.js";
import type Role from "./Role.js";

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
    //table de jointure: liste des identifiants concaténés > 2,4,7
    address_ids: string;
    addresses: Address[];
};
export default User;