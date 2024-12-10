import express, { Request, Response, Router, type Express } from "express";
import http from 'node:http'
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import RoleRouter from "../router/role_router.js";
class Server {
    //propriété
    private app: Express = express();
    private router: Router = express.Router();
    

    //constructeur
    constructor() {
        //relier le routeur à l'application
        this.app.use(this.router);

        //liste des routers
        this.routersList();

    }
    private routersList = () => {
        //préfixe à toutes les routes d'un router
        this.router.use('/', new HomepageRouter().getRoutes());
        this.router.use("/role",new RoleRouter().getRoutes());
        this.router.use("*",new NotFoundRouter().getRoutes());
    }
    //créer le serveur 
    public create = () => {
        return http.createServer(this.app)
    }
}
 
export default Server;
