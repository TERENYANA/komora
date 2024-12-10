import { Link } from "react-router-dom";

const Nav =() => {
    // les balises a sont remplacées par le composant Link
    //les attributs href sont remplacés to
    return <nav>
        <Link to ={'/'}>Home</Link>
        <Link to ={'/contact'}>Contact</Link>
    </nav>;
};

export default Nav;