import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "@/component/provider/UserProvider";
import ProductAPI from "@/service/product_api";
import SecurityAPI from "@/service/security_api";

const AdminProductDeletePage = () => {
    // Récupérer l'ID dans l'URL
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !id) return; // Sécurité : on attend que user et id soient bien définis
        const formData = new FormData();
        formData.append("id", id);

        new SecurityAPI().auth(user).then((authResponse) => {
            new ProductAPI()
                .delete(formData, authResponse.data.token)
                .then(() => {
                    navigate('/admin/product');
                });
        });
    }, [id, navigate, user]);
    
    return <p>Suppression du produit en cours...</p>; // Affichage temporaire pendant l'exécution
};

export default AdminProductDeletePage;
