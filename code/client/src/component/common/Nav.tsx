import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../provider/UserProvider";

const Nav = () => {
	// créer une référence :lien vers un élement HTML remplace l'utilisation de quiry Selector /qyuery selector All 
	// const réference = useRef<type de l'élement ciblé> (valeur initiale de la référence)
	const siteNav = useRef<HTMLDivElement>(null);
	//click sur le bouton de navigation mobile
	//créer un état :useState
	// const [état, setter de l'état] = useState<typer l'état>(valeur initiale de l'état)
	const [navMobileIsVisible, setNavMobileIsVisible] = useState<boolean>(false);

	const click = () => {
		setNavMobileIsVisible(!navMobileIsVisible);
		// console.log(navMobileIsVisible);
	};

//récupérer l'utilisateur
const{user} = useContext(UserContext);


	// créer une référence : lien ver sun élément HTML remplace l'itilisation de querySelector / querySElector

	// les balises a sont remplacées par le composant Link

	//les attributs href sont remplacés to

	return (
		<>
		
			{/* { attrobut ref permet de relier une référence à une balise HTML} */}
			{/* le seule condition disponible dans HTML React : condition ternaire
    si une autre condition est à utiliser ,il est nécessaire de créer une fonctio externe  */}
			<nav
				className={`${styles["site-nav"]} 
    ${navMobileIsVisible ? styles["site-nav-visible"] : ""}`}
				ref={siteNav}
			>
				<Link to={"/"}>Home</Link>
				<Link to={"/contact"}>Contact</Link>

				{
					user.role?.name === "admin" ? (<Link to={"/admin"}>Administration</Link>) : null
				} 

				{user.id ? (
					<Link to={"/logout"}>Log Out</Link>
				) : (
						<>
							<Link to={"/contact"}>Register</Link>
							<Link to={"/contact"}>Login</Link>
						</>
				)
					
				
				}
			</nav>
			{/* 
    ajouter des événements : 
    -utiliser l'evenement irectement dans la balise 
    */}
			<button
				className={styles["btn-nav-mobile"]}
				type="button"
				onClick={click}
			>
				-
			</button>
		</>
	);
};

export default Nav;
