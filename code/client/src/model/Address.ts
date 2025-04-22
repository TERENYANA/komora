import type User from "./User";

type Address = {
    id: number;
    name: string;
    user: User[];
};
export default Address;