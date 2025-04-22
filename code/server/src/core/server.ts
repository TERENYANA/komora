import express, { Request, Response, type Router, type Express } from "express";
import http from "node:http";
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import RoleRouter from "../router/role_router.js";
import cors from "cors";
import AddressRouter from "../router/address_router.js";
import BrandRouter from "../router/brand_router.js";
import CategoryRouter from "../router/category_router.js";
import OrderRouter from "../router/orders_router.js";
import OrderDetailRouter from "../router/order_detail_router.js";
import ProductRouter from "../router/product_router.js";
import UserRouter from "../router/user_router.js";
import ContactRouter from "../router/contact_router.js";
import SecurityRouter from "../router/security_router.js";
import EmailRouter from "../router/email_router.js";
class Server {
  //propriété
  private app: Express = express();
  private router: Router = express.Router();

  //constructeur
  //gerer de roquet multi-origine
  // CORS: Cross Origin Resource Sharing

  //constructeur
  constructor() {
    this.app.use(cors());
    // accéder au contenue d'une roquette  HTTP - propriété body - au format JSON
    this.app.use(express.json());

    //définir la dossier public
    this.app.use(express.static(process.env.ASSETS_DIR as string));

    //relier le routeur à l'application
    this.app.use(this.router);

    //liste des routers
    this.routersList();

  }
  private routersList = () => {
    //préfixe à toutes les routes d'un router
    this.router.use("/", new HomepageRouter().getRoutes());
    this.router.use("/role", new RoleRouter().getRoutes());
    this.router.use("/address", new AddressRouter().getRoutes());
    this.router.use("/brand", new BrandRouter().getRoutes());
    this.router.use("/category", new CategoryRouter().getRoutes());
    this.router.use("/order_detail", new OrderDetailRouter().getRoutes());
    this.router.use("/orders", new OrderRouter().getRoutes());
    this.router.use("/product", new ProductRouter().getRoutes());
    // this.router.use("/order", new OrderDetailRouter().getRoutes());
    this.router.use("/user", new UserRouter().getRoutes());
    this.router.use("/contact", new ContactRouter().getRoutes());
    this.router.use("/email", new EmailRouter().getRoutes());
    this.router.use("/", new SecurityRouter().getRoutes());
    // si la route n'existe pas, à garder à la fin
    this.router.use("*", new NotFoundRouter().getRoutes());
  };
  //créer le serveur
  public create = () => {
    return http.createServer(this.app);
  };
}

export default Server;
