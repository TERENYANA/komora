
import { Link } from "react-router-dom";



const Footer = () => {
return <footer>
    <Link to={"/"}>Home</Link>
    <Link to={"/contact"}>Contact</Link>
    <Link to={"/admin"}>Administration</Link>
    <Link to={"/register"}>Register</Link>
    <Link to={"/login"}>Login</Link>
</footer>
};
export default Footer;