/*
les mises en page permettent de définir les composants communs à plusieurs mises en page
*/

import { Outlet } from "react-router-dom";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";

const BaseLayout = () => {
return<>
<Header/>
{/* Outlet permet de définir l'emplecement du contenu particuier d'une page */}
<Outlet/>
<Footer/>
</>
}

export default BaseLayout;