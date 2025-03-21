import type UserProviderContext from "@/model/context/UserProviderContext";
import { createContext, useState } from "react";
import type UserProviderProps from "../props/user_provider_props";
import type User from "@/model/User";

//créer un context - une donées assosier à un provider (composant)
const UserContext = createContext({} as UserProviderContext);

//provider: composant qui cntient un context
//children réprésente les composant enfants du Provider

const UserProvider=({children}:UserProviderProps)=>{

    //état stockant l'utilisateur connecté
    const[user,setUser]=useState<User>({} as User);
    
    return (
    <UserContext.Provider value={{ user,setUser}}>
        {children}
    </UserContext.Provider>
    );
};

export {UserContext,UserProvider}


