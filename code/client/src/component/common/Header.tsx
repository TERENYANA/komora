import Nav from "./Nav";
//importer d'un CSS d'un composant
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	//en React , l'attribut class est remplacé par className
	return (
		<header className={styles["site-header"]}>
			<div className={styles["site-logo"]}>
				{/* / pour cibler le dossier public */}
				<Link to={"/"}>
					<img src="/img/logo-komora-white.svg" alt="white logo" />
				</Link>
			</div>
			<Nav />
           
		</header>
	);
};

export default Header;
