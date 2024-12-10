import Nav from "./Nav";
//importer d'un CSS d'un composant
import styles from "../../assets/css/header.module.css";
const Header =() => {
    //en React , l'attribut class est remplacé par className
    return <header className={styles["site-header"]}>
<Nav/>
    </header>
};
export default Header;
