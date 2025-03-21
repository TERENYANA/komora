import { Link } from "react-router-dom";
const AdminHomePage = () => {
    return (
        <div>
        <h1>Administration</h1>
         <p>Administration Product</p>
            <Link to={"/admin/product"}>Manage product</Link>
            
    </div>
    )
};
export default AdminHomePage;