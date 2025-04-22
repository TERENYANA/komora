import { useContext, useEffect } from "react";
import type GuardProps from "../props/user_props";
import { UserContext } from "../provider/UserProvider";
import { useNavigate } from "react-router-dom";


//la page vise qui teste 
const Guard = ({ children, roles }: GuardProps) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        //tester le role de l'utilisateur
        if (roles.indexOf(user.role?.name) === -1) {
        //stoquer un message dans la session
        window.sessionStorage.setItem("notice", 'Acces denied');
        //redirection
        navigate('/');
        }
    },[roles,user,navigate]);
    return <>
        {children}</>
    };
    export default Guard;