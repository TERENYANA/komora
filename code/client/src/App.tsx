// import d'un CSS global
import "./assets/css/reset.css"
import "./assets/css/style.css";
import { RouterProvider } from "react-router-dom";
import router from "./service/router";

/*
composant REACT :
capitaliser le nom du composant
fonction exportée JS/TS qui renvoie du HTML
le nom du composant devient une balise
*/
const App = () =>{
return <RouterProvider router={router}/>;
};
// tout le provider sera geré par le router router

export default App;

