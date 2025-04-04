import type Address from "./Address.js";
import type User from "./Role.js";

type User_address = {
    address_id: number;
    adress: Address;
    user_id: number;
    user: User;
};
export default User_address;