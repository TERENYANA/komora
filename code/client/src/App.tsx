// import d'un CSS global
import "./assets/css/reset.css"
import "./assets/css/style.css";
import { RouterProvider } from "react-router-dom";
import router from "./service/router";
import { UserProvider } from "./component/provider/UserProvider";

/*
composant REACT :
capitaliser le nom du composant
fonction exportée JS/TS qui renvoie du HTML
le nom du composant devient une balise
*/
const App = () =>{

return(
<UserProvider>
	<RouterProvider router={router} />
</UserProvider>
);

};
// tout le provider sera geré par le router router
export default App;

