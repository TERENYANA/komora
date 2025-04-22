import type Address from "./Address.js";
import type Orders from "./Orders.js";
import type Role from "./Role.js";


type User = {
    user: User;
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    number: string;
    address: string;
    role_id: number;
    role: Role;
    order_id: number;
    order: Orders;
    //table de jointure: liste des identifiants concaténés > 2,4,7
    address_ids: string;
    addresses: Address[];
    key:string;
};
export default User;