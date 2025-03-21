import { UserContext } from "@/component/provider/UserProvider";
import User from "@/model/User";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        //suprimer l'utilisateur
        setUser({} as User);
        navigate("/");
    }, [setUser, navigate]);



    return <>
    </>
};

export default LogoutPage;