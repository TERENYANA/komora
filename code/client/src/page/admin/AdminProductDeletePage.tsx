import { UserContext } from "@/component/provider/UserProvider";
import ProductAPI from "@/service/product_api";
import SecurityAPI from "@/service/security_api";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductDelatePage=()=>{
    //récuperer l'id dans l'URL
    const {id} = useParams();
    //navigation
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() =>{ 
        //créer le formData
        const formData = new FormData();
        formData.append("id", id as unknown as string);
        
        new SecurityAPI().auth(user).then((authReponse)=> {
            new ProductAPI().delete(formData,authReponse.data.token).then((response)=>{
                navigate('/admin/product');
            });
        });

      
    },[id,navigate]);
    return<></>
}
export default AdminProductDelatePage;