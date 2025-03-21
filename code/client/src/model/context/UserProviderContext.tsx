//typer les donées contenues dans le context 

import type { Dispatch, SetStateAction } from "react";
import type User from "../User";

type UserProviderContext={
    user:User;
    setUser:Dispatch<SetStateAction<User>>
}
export default UserProviderContext;

