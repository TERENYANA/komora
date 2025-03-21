import ProductAPI from "@/service/product_api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductDelatePage=()=>{
    //récuperer l'id dans l'URL
    const {id} = useParams();
    //navigation
    const navigate = useNavigate();

    useEffect(() =>{ 
        //créer le formData
        const formData = new FormData();
        formData.append("id",id as unknown as string);

        new ProductAPI().delete(formData).then((response)=>{
            navigate('/admin/product');
        });
    },[id,navigate]);
    return<></>
}
export default AdminProductDelatePage;