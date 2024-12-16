import Address from "./Address.js";
import User from "./User.js";

type User_address = {
    address_id: number;
    adress: Address;
    user_id: number;
    user: User;
};
export default User_address;